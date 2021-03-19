---
id: configuration
title: Конфигурация
---

## Общие параметры конфигурации адаптеров

Параметры конфигурации адаптера размещаются в файлах *appsettings*.`{EnvironmentName}` *.json*.

Конфигурация адаптера может содержать в себе следующие основные свойства:

- *Logging* - конфигурацию ведения журналов;
- *AllowedHosts* - специальная конфигурация, которая принимает список имен хостов;
- *AppSettings* - набор настроек для приложения;
- *ConnectionStrings* - список строк подключения к внешним источникам данных;
- *Services* - определяет коллекцию микросервисов используемых адаптером и их конфигурации.



### Logging

Свойство `Logging` может содержать свойство [LogLevel](https://docs.microsoft.com/ru-ru/dotnet/api/microsoft.extensions.logging.loglevel) и свойства поставщика журналов. Свойство `LogLevel` указывает минимальный уровень журнала для выбранных категорий. Уровни журналов задаются в диапазоне от 0 до 6, где:

`Trace` = 0, `Debug` = 1, `Information` = 2, `Warning` = 3, `Error` = 4, `Critical` = 5 и `None` = 6. 

Свойство поставщика может задавать свойство `LogLevel`. Свойство `LogLevel` поставщика определяет уровень ведения журналов для этого поставщика и переопределяет любые другие не относящиеся к поставщику параметры ведения журналов.

Пример описания свойства `LogLevel`  в файле *appsettings.json*:

```json
{
  "Logging": {
    "LogLevel": { // Все провайдеры, Loglevel применяется ко всем поставщикам, которые поддерживают это свойство
      "Default": "Error", // Журнал по умолчанию, Error и выше
      "Microsoft": "Warning" // Все категории Microsoft *, Warning и выше.
    },
    "Debug": { // Debug провайдер.
      "LogLevel": {
        "Default": "Information", // Переопределение предыдущих настроек LogLevel:Default.
        "Microsoft.Hosting": "Trace" // Категория для Debug:Microsoft.Hosting.
      }
    },
    "EventSource": { // EventSource провайдер
      "LogLevel": {
        "Default": "Warning" // Все категории EventSource провайдера.
      }
    }
  }
}
```

Параметры в `Logging.{providername}.LogLevel` переопределяют параметры в `Logging.LogLevel`.

Минимальный уровень ведения журнала можно указать для:

- конкретных поставщиков. Например: `Logging:EventSource:LogLevel:Default:Information`
- конкретных категорий. Например: `Logging:LogLevel:Microsoft:Warning`
- всех поставщиков и всех категорий: `Logging:LogLevel:Default:Warning`

***Любые*** журналы с уровнем ниже минимального:

- не передаются поставщику;
- не записываются в журнал и не отображаются.

Чтобы отключить все журналы, укажите [LogLevel.None](https://docs.microsoft.com/ru-ru/dotnet/api/microsoft.extensions.logging.loglevel). `LogLevel.None` имеет значение 6, то есть выше `LogLevel.Critical` (5).

Если поставщик поддерживает [области журналов](https://docs.microsoft.com/ru-ru/aspnet/core/fundamentals/logging/?view=aspnetcore-3.1#logscopes), `IncludeScopes` определяет, включены ли они.

Следующее описание файла *appsettings.json* / *appsettings.`{EnvironmentName}`.json* содержит все поставщики, включенные по умолчанию:

```json
{
  "Logging": {
    "LogLevel": { // Нет поставщика, Loglevel применяется ко всем включенным поставщикам.
      "Default": "Error",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Warning"
    },
    "Debug": { // Debug провайдер.
      "LogLevel": {
        "Default": "Information" // Переопределяет предыдущую настройку LogLevel:Default.
      }
    },
    "Console": {
      "IncludeScopes": true,
      "LogLevel": {
        "Microsoft.AspNetCore.Mvc.Razor.Internal": "Warning",
        "Microsoft.AspNetCore.Mvc.Razor.Razor": "Debug",
        "Microsoft.AspNetCore.Mvc.Razor": "Error",
        "Default": "Information"
      }
    },
    "EventSource": {
      "LogLevel": {
        "Microsoft": "Information"
      }
    },
    "EventLog": {
      "LogLevel": {
        "Microsoft": "Information"
      }
    }
  }
}
```

В данном примере:

- Категории и уровни не являются предлагаемыми значениями. Этот пример представлен с целью продемонстрировать все поставщики по умолчанию.
- Параметры в `Logging.{providername}.LogLevel` переопределяют параметры в `Logging.LogLevel`. Например, уровень в `Debug.LogLevel.Default` переопределяет уровень в `LogLevel.Default`.
- Каждый поставщик по умолчанию использует *псевдоним*. Каждый поставщик определяет *псевдоним*, используемый в конфигурации вместо полного имени типа. Ниже приведены псевдонимы встроенных поставщиков:
  - Console
  - Debug
  - EventSource
  - EventLog
  - ApplicationInsights



### AllowedHosts

Данный список имен хостов разделяется точкой с запятой, без номеров портов.

ПО промежуточного слоя фильтрации узлов отключено по умолчанию. Чтобы включить ПО промежуточного слоя, определите свойство `AllowedHosts` в *appsettings.json* / *appsettings.`{EnvironmentName}`.json*:

```json
{
  "AllowedHosts": "example.com;localhost"
}
```



### AppSettings

Настройки для приложения содержат:

- `CurrentCulture` - определения для локализации;

- `MetadataProviderId` - параметр указывает идентификатор адаптера;

- `NuGetPackage` - настройки NuGet пакетов. Содержит свойство *Repository* указывающее на путь к размещению пакетов, может задаваться через точку с запятой.

  Пример заполнения свойства `NuGetPackage` в файле *appsettings.json* / *appsettings.`{EnvironmentName}`.json*:

```json
{
	"NuGetPackage":
	{
		"Repository": "D:\\LocalPackages"
	}
}
```

- `MassTransit` - Содержит определение настроек брокера сообщений. Подробнее см. в [брокеры сообщений](https://docs.t2plus.ru/integration/components.html#%D0%B1%D1%80%D0%BE%D0%BA%D0%B5%D1%80-%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B8).



### ConnectionStrings

Конфигурация строк подключения разбытых по псевдонимам, для подключения к внешним источникам данных, например в базам данных.

Основные необходимые строки подключения к источникам данных в адаптере для [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory), имеют псевдонимы `DIPConnectionString` и `KeyLocator`, каждый из которых сожержит параметры подключения к базе данных.

```json
{
	"ConnectionStrings":
	{
		"DIPConnectionString": // Строка подключения к базе данных адаптера
        {
			"ConnectionString": "Data Source={databa_source};Initial Catalog={catalog};Integrated Security=True",
			"ProviderName": "System.Data.SqlClient",
			"CommandTimeout": 100
		},
		"KeyLocator": // Строка подключения к базе данных адаптера KeyLocator
        {
			"ConnectionString": "Data Source={databa_source};Initial Catalog={catalog};Integrated Security=True",
			"ProviderName": "System.Data.SqlClient",
			"CommandTimeout": 100
		}
	}
}
```

Каждый из псевдонимов содержит свойство `ConnectionString`, которое описывает строку подключения к базе данных. Синтаксис описания данной строки см. в [синтаксис строки подключения](https://docs.microsoft.com/ru-ru/dotnet/framework/data/adonet/connection-string-syntax).

Свойство `ProviderName`, настройки подключения к базе данных, указывает используемого поставщика для подключения к базе данных.

Так же настройки подключения к дазам данных могут содержать свойство `CommandTimeout`, как это показано в коде конфигурации выше. Данныое свойство определяет время ожидания (в секундах) при выполнении команды перед завершением попытки и генерацией ошибки. Значение по умолчанию — 30.



### Services

Описание конфигурации каждого микросервиса заключается в фигурные скобки и содержи обязательное свойство `AssemblyQualifiedName`, в которой  через запятую указывается строка с полным именем сервиса и имя файла библиотеки где этот сервис расположен. Так же конфигурация микросервиса может содержать свойство `Settings` с настройками для него. Пример настройки микросервисов приведён в коде ниже.

```json
{
    "Services": [
		{	// Пимер подключения микросервиса без дополнительных настроек
			"AssemblyQualifiedName": "T2.DIP.KeyLocator.DB.Services.KeyLocatorDbService, T2.DIP.KeyLocator.DB"
		},
		{	// Пимер подключения микросервиса с дополнительными настройками.
			"AssemblyQualifiedName": "T2.DIP.GRPC.Server.Services.GrpcServer, T2.DIP.GRPC.Server",
			"Settings": {
				"Host": "localhost",
				"Port": 5000,
				"Processors": [
					"T2.DIP.Proto.Lock.Processors.LockCommandsProcessor, T2.DIP.Proto.Lock"
				]
			}
		}
	]
}
```

