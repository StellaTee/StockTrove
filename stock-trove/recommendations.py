import nltk
import psycopg
import sys
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import random

connection = psycopg.connect(
    dbname="defaultdb",
    user="doadmin",
    password="AVNS_qYk117_9WLfyoiGLK4b",
    host="db-stocktrove-do-user-15904210-0.c.db.ondigitalocean.com",
    port="25060",
    sslrootcert="ca-certificate.crt",
    sslmode="require"
)

class company:
    def __init__(self, companyid, companydescription, employeecount, similarity):
        self.companyid = companyid
        self.companydescription = companydescription
        self.employeecount = employeecount
        self.similarity = similarity

def getKey(obj):
    return obj.similarity

def getKey2(obj):
    return obj.employeecount

def find_closest(arr, target, k):
    differences = [(abs(num.employeecount - target), num) for num in arr]
    differences.sort(key = lambda x: x[0])
    closest = [element[1] for element in differences[:k]]
    return closest
    
    
# Calculates similarity between two company descriptions
def company_similarity(text1, text2):
    # Tokenise and lemmatise the texts
    tokens1 = word_tokenize(text1)
    tokens2 = word_tokenize(text2)
    lemmatizer = WordNetLemmatizer()
    tokens1 = [lemmatizer.lemmatize(word) for word in tokens1]
    tokens2 = [lemmatizer.lemmatize(word) for word in tokens2]

    # Remove stop words    
    stop_words = stopwords.words('english')
    tokens1 = [word for word in tokens1 if word not in stop_words]
    tokens2 = [word for word in tokens2 if word not in stop_words]

    # Create TF-IDF vectors
    vectorizer = TfidfVectorizer()
    vector1 = vectorizer.fit_transform([text1])
    vector2 = vectorizer.transform([text2])


    # Calculate cosine similarity
    similarity = cosine_similarity(vector1, vector2)
    return similarity


def get_recommendations(user_id):
    cursor = connection.cursor()
    cursor.execute("SELECT companyid FROM user_companies WHERE userid = %s;", (user_id,))
    ids = cursor.fetchall()
    following = []
    for id in ids:
        cursor.execute("SELECT companyid, companydescription, employeecount FROM companies WHERE companyid = %s;", (id[0],))
        following.append(cursor.fetchone())
    cursor.execute("SELECT companyid, companydescription, employeecount FROM companies;")
    companies = cursor.fetchall()
    recs = []
    if (len(following) == 0):
        for i in range(5):
            x = random.choice(companies)
            companies.remove(x)
            recs.append(x)
        for item in recs:
            cursor.execute("INSERT INTO user_recommendations (userid, companyid) VALUES (%s, %s)", (user_id, item[0]))
        connection.commit()
        cursor.close()
        connection.close()
        return

    # For each company user follows, calculate the similarity with all companies in the DB
    for company1 in following:
        for company2 in companies:
            if company1[0] != company2[0] and company2 not in following:
                similarity = company_similarity(company1[1], company2[1])
                if similarity > 0.75:
                    print(similarity)
                    tempCompany = company(company2[0], company2[1], company2[2], similarity[0][0])
                    recs.append(tempCompany)
    recs.sort(key = getKey, reverse = True)
    realRecs = []
    closests = []
    if len(recs) > 8:
        for i in range(4):
            realRecs.append(recs[i])
            recs.pop(i)
        for i in range(0, min(2, len(following) - 1)):
            closests = find_closest(recs, following[i][2], 2)
        for ele in closests:
            if ele not in realRecs:
                realRecs.append(ele)
    elif (len(recs) > 3):
        for i in range(len(recs)):
            realRecs.append(recs[i])
    else:
        for i in range(5):
            x = random.choice(companies)
            companies.remove(x)
            newCompany = company(x[0], x[1], x[2])
            realRecs.append(newCompany)
        for item in realRecs:
            cursor.execute("INSERT INTO user_recommendations (userid, companyid) VALUES (%s, %s)", (user_id, item[0]))
        connection.commit()
        cursor.close()
        connection.close()
        return
    for rec in realRecs:
        cursor.execute("INSERT INTO user_recommendations (userid, companyid) VALUES (%s, %s)", (user_id, rec.companyid))
    connection.commit()
    cursor.close()
    connection.close()

get_recommendations(int(sys.argv[1]))
