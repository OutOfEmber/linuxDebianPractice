#!/bin/bash

cd ~/tereshenko/linuxDebianPractice

# Проверка наличия Node.js
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    sudo apt update && sudo apt install -y nodejs npm
fi

# Проверка наличия PM2
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
fi

# Git pull для обновления
if [ -d ".git" ]; then
    echo "Updating from git..."
    git pull
fi

# Установка зависимостей
if [ -f "package.json" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Остановка старого процесса, если есть
pm2 delete test-api 2>/dev/null

# Запуск сервера
echo "Starting server..."
pm2 start server.js --name test-api

# Сохранение конфигурации
pm2 save

# Вывод статуса
echo ""
echo "Deployment complete!"
echo "Process status:"
pm2 list
echo ""
echo "Server available at: http://82.146.63.187:5000"
