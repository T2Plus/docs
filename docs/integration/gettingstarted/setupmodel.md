---
id: setupmodel
title: Настройка интеграции
---

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

