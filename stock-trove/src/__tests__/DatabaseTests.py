import psycopg
import datetime

def tablesExist(cursor):
    cursor.execute("SELECT * FROM users;")
    cursor.execute("SELECT * FROM companies;")
    cursor.execute("SELECT * FROM events;")
    cursor.execute("SELECT * FROM user_recommendations;")
    cursor.execute("SELECT * FROM user_companies;")
    cursor.execute("SELECT * FROM user_notifications;")
    
    # Check if all tables exist
    tables = ['users', 'companies', 'events', 'user_recommendations', 'user_companies', 'user_notifications']
    for table in tables:
        if table not in cursor.fetchall():
            print(f"Table {table} does not exist.")
    
    print("----------------------------------------------------------------------")
    
def cantAddDuplicateKeys(cursor): 
    try:
        cursor.execute("INSERT INTO users VALUES (%s, %s, %s,%s,%s)",(1, "a@b.com", "O'Reilly",[0,0],datetime.date(2020, 11, 18))) # primary key check
    except:
        print("Duplicates not occurring, tests passed")
    
def relationsAreValid(cursor):
    # Check if foreign key relations are valid
    cursor.execute("SELECT * FROM user_recommendations;")
    dataset = cursor.fetchall()
    for record in dataset:
        if record[0] not in cursor.execute("SELECT userid FROM users;").fetchall():
            print(f"Invalid user id {record[0]} in user_recommendations table.")
        if record[1] not in cursor.execute("SELECT companyid FROM companies;").fetchall():
            print(f"Invalid company id {record[1]} in user_recommendations table.")
    
    cursor.execute("SELECT * FROM user_companies;")
    dataset = cursor.fetchall()
    for record in dataset:
        if record[0] not in cursor.execute("SELECT userid FROM users;").fetchall():
            print(f"Invalid user id {record[0]} in user_companies table.")
        if record[1] not in cursor.execute("SELECT companyid FROM companies;").fetchall():
            print(f"Invalid company id {record[1]} in user_companies table.")
    
    cursor.execute("SELECT * FROM user_notifications;")
    dataset = cursor.fetchall()
    for record in dataset:
        if record[0] not in cursor.execute("SELECT userid FROM users;").fetchall():
            print(f"Invalid user id {record[0]} in user_notifications table.")
        if record[1] and record[1] not in cursor.execute("SELECT eventid FROM events;").fetchall():
            print(f"Invalid event id {record[1]} in user_notifications table.")
        if record[2] and record[2] not in cursor.execute("SELECT companyid FROM companies;").fetchall():
            print(f"Invalid company id {record[2]} in user_notifications table.")
    
    print("----------------------------------------------------------------------")
    
def canUpdateTables(cursor):
    # Add your update table tests here
    pass

def runTests():
    connection = psycopg.connect(
        dbname="defaultdb",
        user="doadmin",
        password="AVNS_qYk117_9WLfyoiGLK4b",
        host="db-stocktrove-do-user-15904210-0.c.db.ondigitalocean.com",
        port="25060"
    )

    cursor = connection.cursor()
    tablesExist(cursor)
    #cantAddDuplicateKeys(cursor)
    relationsAreValid(cursor)
    canUpdateTables(cursor)

    cursor.close()
    connection.close()

runTests()