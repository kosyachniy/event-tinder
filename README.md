# Запуск
## BackEnd
1. Установка пакетов

В директории ``` backend/ ```
```
python3 -m venv env
env/bin/pip install -r requirements.txt
```

2. Запуск

В директории ``` backend/ ```
```
./run.py
```
или
```
env/bin/python run.py
```

## FrontEnd
1. Ключи

Файл ``` frontend/src/keys.js ```
```
export const appId = '<App ID>'
export const appCode = '<App Code>'
```

2. Установка пакетов

В директории ``` frontend/ ```
```
npm install
```

3. Запуск

В директории ``` frontend/ ```
```
npm start
```

## Парсер
1. Установка пакетов

В директории ``` backend/parser/ ```
```
npm install
```

2. Запуск

В директории ``` backend/parser/src/parser-for-site/ ```
```
node leader-id.js
```
