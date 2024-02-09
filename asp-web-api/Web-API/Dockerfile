# 1. Используйте официальный образ dotnet в качестве базового образа
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# 2. Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# 3. Копируем файлы проекта (проекты) внутрь контейнера
COPY . .

# 4. Восстанавливаем зависимости и собираем приложение
RUN dotnet restore
RUN dotnet publish -c Release -o out

# 5. Используем образ dotnet в качестве базового образа для запуска контейнера
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime

# 6. Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# 7. Копируем собранные файлы из предыдущего этапа внутрь контейнера
COPY --from=build /usr/src/app/out .

EXPOSE 80

# 9. Запускаем маршрутизатор dotnet при запуске контейнера
ENTRYPOINT ["dotnet", "Web-API.dll"]
