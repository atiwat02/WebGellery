
from flask import Flask,request
from werkzeug.utils import secure_filename
import python_jwt as jwt
import mysql.connector
import bcrypt
import json
import requests
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

mydb = mysql.connector.connect(
  host="188.166.228.23",
  user="master",
  password="Cloud2_Space",
  database = 'gellery'
)

mycursor = mydb.cursor()

@app.route('/')
def hello_world():
    return {"status":'Welcome'}

@app.route('/signup', methods = ['GET', 'POST'])
def singup():
  if request.method =='POST':
    data = str(request.get_data().decode())
    info = json.loads(data)
    name = info['name']
    email = info['email']
    password = info['password'].encode('utf-8')
    sql = "SELECT email FROM User WHERE email= %s"
    adr = (email,)
    mycursor.execute(sql, adr)
    myresult = mycursor.fetchall()
    if len(myresult) == 1:
      print("มี")
      return {"status": "this email has already been used"}
    if len(myresult) == 0:
      print("ไม่มี")
      salt = bcrypt.gensalt()
      hashed = bcrypt.hashpw(password,salt)
      p = hashed.decode()
      sql = "INSERT INTO User (name, email,password) VALUES (%s, %s,%s)"
      val = (name, email,p)
      mycursor.execute(sql, val)
      mydb.commit()
      return {"status":"success"}
@app.route('/signin', methods = ['GET', 'POST'])
def singin():
  if request.method =='POST':
    data = str(request.get_data().decode())
    info = json.loads(data)
    email = info['email']
    password = info['password'].encode('utf-8')
    sql = "SELECT id,name,email,password FROM User WHERE email= %s"
    adr = (email, )
    mycursor.execute(sql, adr)
    myresult = mycursor.fetchall()
    if len(myresult) == 1:
      for x in myresult:
        dbdata = x
      if bcrypt.checkpw(password,dbdata[3].encode('utf-8')):
        print("match")
        key = ''
        payload = { 'id': dbdata[0], 'name': dbdata[1],"email":dbdata[2]}
        token = jwt.generate_jwt(payload, key, 'HS256')
        return {'status':'singin success','token':token}
      else:
        print("does not match")
        return {'status':'password is incorrect'}
    else:
       return {'status':'invalid email'}
@app.route('/upload', methods = ['GET', 'POST'])
def upload_file():
  if request.method == 'POST':
    print(request.files['myFile'].filename)
    f = request.files['myFile']
      # filename = secure_filename(f.filename)
      # f.save(os.path.join("files/",filename))
    headers = {"Authorization": "Bearer ya29.a0AfH6SMCCYvGlxPlIgICDFW60LrZbJ7DIclbWj48Mld7rWoTtDsP1ktTMhsad_AEIRO2jU-zSHcD-QR42pJ5a2sDw2xchdWj6Z4lLGzC20R-ltvIkx_Gw1iC2wYrPT3ocApY27WlpzsE64AxgMpp1uWSQAel5"}
    para = {"name": f.filename,
              "parents": ["1lMBii79CfFiG7t9KcUS0cB-4EvmpV8Pf"]
            }
    files = {'data': ('metadata', json.dumps(para), 'application/json; charset=UTF-8'),
                'file': f
            }
    r = requests.post("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",headers=headers,files=files)
    print(r.json()['id'])
    #   f.save(secure_filename("files/"+f.filename))
    return r.json()
@app.route('/setdata', methods = ['GET', 'POST'])
def setdata_file():
  if request.method == 'POST':
    data = str(request.get_data().decode())
    info = json.loads(data)
    iduser = info['iduser']
    nameuser = info['nameuser']
    imgname = info['imgname']
    idimg = info['idimg']
    print(iduser,nameuser,imgname,idimg)
    sql = "INSERT INTO data (id, iduser,nameuser,imgname) VALUES (%s,%s,%s,%s)"
    val = (idimg,iduser,nameuser,imgname)
    mycursor.execute(sql, val)
    mydb.commit()
    return {"status":"success"}


@app.route('/viewdata')
def get_datas():
  sql = "SELECT * FROM data ORDER BY id DESC "
  mycursor.execute(sql)
  myresult = mycursor.fetchall()
  return {'status': 'success','data':myresult}

if __name__ == '__main__':
   app.run(debug = True)
