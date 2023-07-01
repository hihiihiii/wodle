# pip 단축어를 통해서 쉽게 다운로드 받을 수 있다.
# curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
# python3 get-pip.py
# 위와 같이 m1 설치법 맞게 진행
# pip install 'uvicorn[standard]'
# uvicorn main:app --reload 새로운 서버 실행
# 비동기 요청도 주고 받을 수 있다.

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app= FastAPI() 

answer = "TRAIN"

@app.get('/answer')
def get_answer():
    return {"answer" : answer}

app.mount("/", StaticFiles(directory="static",html=True), name="static")


