---
id: setupmodel
title: Настройка интеграции
sidebarDepth: 0
---

Прочитав данный раздел, вы научитесь:
1. Настраивать адаптеры к БД.
2. Создавать сущности.
3. Создавать конвейеры.
4. Создавать бизнес-адаптеры и триггеры.
5. Активировать интеграцию.


## Настройка и запуск адаптера для БД-источника

Установите адаптер **T2.DIP.Adapter.DB** для БД-источника.

В каталоге адаптера в файле **appsettings.json** укажите актуальные значения следующих параметров:

```json title="T2.Integration\Config\T2.DIP.Adapter.DemoSourceDB\$CustomConfig-T2.DIP.Adapter.DemoSourceDB\appsettings.json"
{
  ...
  "AppSettings": {
    ...
    "MassTransit": {
      ...
      "HostName": "localhost",
      "VirtualHost": "DIP",
      "UserName": "dip",
      "Password": "dip"
    },
    "NuGetPackage": {
      "Repository": "C:\\T2.Integration\\LocalPackages"
    }
  },

  "ConnectionStrings": {
    "AdapterConnectionString": {
      "ConnectionString": "Data Source=<sql server instance>;Initial Catalog=T2.DemoSourceDB;Integrated Security=True",
      ...
    },
    "DIPConnectionString": {
      "ConnectionString": "Data Source=<sql server instance>;Initial Catalog=T2.DemoSourceDB.Adapter;Integrated Security=True",
      ...
    },
    //нужен только в бизнес адаптере
    //находится тут для того, чтобы пользователь мог менять конфигурацию
    "KeyLocator": {
      "ConnectionString": "Data Source=<sql server instance>;Initial Catalog=T2.DIP.KeyLocator;Integrated Security=True",
      ...
    }
  },
  ...
  "Services": [
    ...
    {
      ...
      "Settings": {
        "OutputDir": "C:\\T2.Integration\\Config\\T2.DIP.Adapter.DemoSourceDB\\$Build\\Target"
      }
    },
    {
      ...
      "Settings": {
        "BusinessModelDirectory": "**C:**\\T2.Integration\\BA\\DemoSourceDB",
        ...
        "Arguments": " --adapterZipName=T2.DIP.Starter.DB.zip --adapterConfigZipName=$CustomConfig-T2.DIP.Adapter.DemoSourceDB.zip --NomadZipDirectory=C:\\T2.Integration\\Nginx\\html\\nomad --NomadFileDirectory=C:\\T2.Integration\\Cluster\\nomad_files --NomadClusterDirectory=C:\\T2.Integration\\Cluster"
      }
    }
  ]
}
```

## Настройка и запуск адаптера для БД-приемника

Установите адаптер **T2.DIP.Adapter.DB** для БД-приемника.

В каталоге адаптера в файле **appsettings.json** укажите актуальные значения следующих параметров:

```json title="T2.Integration\Config\T2.DIP.Adapter.DemoTargetDB\$CustomConfig-T2.DIP.Adapter.DemoTargetDB\appsettings.json"
{
  ...
  "AppSettings": {
    ...
    "MassTransit": {
      ...
      "HostName": "localhost**",
      "VirtualHost": "DIP**",
      "UserName": "dip",
      "Password": "dip"
    },
    "NuGetPackage": {
      "Repository": "C:\\T2.Integration\\LocalPackages"
    }
  },

  "ConnectionStrings": {
    "AdapterConnectionString": {
      "ConnectionString": "Data Source=<sql server instance>;Initial Catalog=T2.DemoTargetDB;Integrated Security=True",
      ...
    },
    "DIPConnectionString": {
      "ConnectionString": "Data Source=<sql server instance>;Initial Catalog=T2.DemoTargetDB.Adapter;Integrated Security=True",
      ...
    },
    //нужен только в бизнес адаптере
    //находится тут для того, чтобы пользователь мог менять конфигурацию
    "KeyLocator": {
      "ConnectionString": "Data Source=<sql server instance>;Initial Catalog=T2.DIP.KeyLocator;Integrated Security=True",
      ...
    }
  },
  ...
  "Services": [
    ...
    {
      ...
      "Settings": {
        "OutputDir": "C:\\T2.Integration\\Config\\T2.DIP.Adapter.DemoTargetDB\\$Build\\Target"
      }
    },
    {
      ...
      "Settings": {
        "BusinessModelDirectory": "C:\\T2.Integration\\BA\\DemoTargetDB",
        ...
        "Arguments": " --adapterZipName=T2.DIP.Starter.DB.zip --adapterConfigZipName=$CustomConfig-T2.DIP.Adapter.DemoTargetDB.zip --NomadZipDirectory=C:\\T2.Integration\\Nginx\\html\\nomad --NomadFileDirectory=C:\\T2.Integration\\Cluster\\nomad_files --NomadClusterDirectory=C:\\T2.Integration\\Cluster"
      }
    }
  ]
}
```	

## Вход на сервер настройки

Зайдите на сервер настройки интеграции через браузер по ссылке [https://localhost:1111/](https://localhost:1111/).

В окне аутентификации


![img](../_assets/DIP-HelloWorld-Login2.png)


введите **Имя пользователя** = *Admin*, **Пароль** = *1* и нажмите **Ввод**.

## Проверка регистрации систем

Перейдите в меню **Инфраструктура \ Системы** и убедитесь, что системы **DemoSourceDB** и **DemoTargetDB** зарегистрированы в **Т2 Интеграция**:


![img](../_assets/DIP-HelloWorld-Systems.png)

## Создание сущности

Перейдите в меню **Настройки интеграции \ Пользовательская модель** и создайте сущность **HelloWorld** в соответствии с рисунками ниже:


![img](../_assets/DIP-HelloWorld-EntityCreate.png)


![img](../_assets/DIP-HelloWorld-EntityCreateDlg.png)


![img](../_assets/DIP-HelloWorld-Entity.png)

## Создание конвейеров

Установите курсор на сущность **HelloWorld** и создайте конвейер на отправку в соответствии с рисунками ниже:

![img](../_assets/DIP-HelloWorld-CreateCnv.png)


![img](../_assets/DIP-HelloWorld-CnvForSend.png)


Для операции **Сопоставить объекты ИС с объектами передачи** задайте следующее сопоставление:

![img](../_assets/DIP-HelloWorld-CnvForSend-Mapping.png)


Для сущности **HelloWorld** создайте конвейер на получение:

![img](../_assets/DIP-HelloWorld-CnvForReceive.png)


Для операции **Сопоставить объекты передачи с объектами ИС** задайте следующее сопоставление:

![img](../_assets/DIP-HelloWorld-CnvForReceive-Mapping.png)


= Фиксация изменений в пользовательской модели =

Нажмите кнопку **Зафиксировать** для фиксации сделанных изменений в **Пользовательской модели**:

![img](../_assets/DIP-HelloWorld-UserIM-FixButton.png)


![img](../_assets/DIP-HelloWorld-UserIM-Fix.png)


![img](../_assets/DIP-HelloWorld-UserIM-Fix2.png)


= Отправка изменений в основную модель =

Нажмите кнопку **Отправить**. Таким образом данные из **Пользовательской модели** будут перенесены в **Основную модель**.

![img](../_assets/DIP-HelloWorld-UserIM-SendButton.png)


![img](../_assets/DIP-HelloWorld-UserIM-Send.png)


![img](../_assets/DIP-HelloWorld-UserIM-Send2.png)


Перейдите в меню **Настройка интеграции \ Основная модель** и убедитесь, что в ней появилась сущность **HelloWorld** из **Пользовательской модели**:

![img](../_assets/DIP-HelloWorld-MainIM-Entities.png)


## Создание бизнес-адаптеров и триггеров

Для систем **DemoSourceDB** и **DemoTargetDB** создайте бизнес-адаптеры в соответствии с рисунками ниже: 

![img](../_assets/DIP-HelloWorld-MainIM-BA-Create.png)


![img](../_assets/DIP-HelloWorld-MainIM-DemoSourceDBBA.png)


![img](../_assets/DIP-HelloWorld-MainIM-DemoTargetDBBA.png)


Для бизнес-адаптера **DemoSourceDBBA** создайте триггер на таблицу **HelloWorld** в соответствии с рисунками ниже: 

![img](../_assets/DIP-HelloWorld-MainIM-Trigger-Create.png)


![img](../_assets/DIP-HelloWorld-MainIM-Trigger.png)


![img](../_assets/DIP-HelloWorld-MainIM-Trigger2.png)


![img](../_assets/DIP-HelloWorld-MainIM-Trigger3.png)


![img](../_assets/DIP-HelloWorld-MainIM-Trigger4.png)

## Активация интеграции

Нажмите кнопку **Активировать** для активации **Основной модели**:

![img](../_assets/DIP-HelloWorld-MainIM-ActivateButton.png)



![img](../_assets/DIP-HelloWorld-MainIM-Activate.png)

## Запуск синхронизации данных

В **SQL Server Management Studio** выполните следующую команду для имитации модификации данных в таблице **HelloWorld** в БД-источнике:

    UPDATE [T2.DemoSourceDB].[dbo].[HelloWorld] SET Text = Text;

Передача данных в БД-приемник выполнится автоматически максимум через 10 секунд.

## Результат передачи данных

Выполните команду чтения данных из таблицы **HelloWorld** в БД-приемнике:

    SELECT * FROM [T2.DemoTargetDB].[dbo].[HelloWorld];

Результатом будет строка следующего вида:

    Id   Text
    ---  ----------------------------------------------
      1  Hello World from T2.DemoSourceDB!
