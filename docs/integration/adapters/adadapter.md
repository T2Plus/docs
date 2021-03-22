---
id: adadapter
title: Адаптер к Active Directory
---

## Назначение

**Адаптер к Active Directory** - позволяет подключать [службу каталогов](https://ru.wikipedia.org/wiki/Служба_каталогов) корпорации [Microsoft](https://ru.wikipedia.org/wiki/Microsoft) для операционных систем семейства [Windows Server](https://ru.wikipedia.org/wiki/Windows_Server) к **Т2 Интеграция**.

Поддерживаются предустановленные [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory) с версии *Windows Server 2008 R2*.



## Описание

При первом запуске или после обновления, адаптер для [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory) регистрируется в DIP сервере и обновляет в нём свои метаданные модели классов прикладной системы. Данные классы и их свойства используются для настройки модели интеграции. 

Предустановленная модель метаданных позволяет работать с такими типами данных, как:

- *OrganizationUnit* - Представляет собой контейнер для хранения пользователей, груп и других объектов.
- *User* - Этот класс используется для хранения информации о пользователе.
- *Group* - Хранит список имен пользователей. Используется для применения принципалов безопасности на ресурсы.

Метаданные, предоставляемые адаптером, так же могут быть сгенерированы непосредственно под текущую настройку схемы данных [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory). Для этого необходимо в настройках конфигурации адаптера подключить и настроить [микросервис](https://docs.t2plus.ru/integration/adapters/adadapter.html#%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B-%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B3%D1%83%D1%80%D0%B0%D1%86%D0%B8%D0%B8) `T2.DIP.Adapter.AD.Services.Prepare.AdPreparerService`.

Так же на ряду с предоставлением метаданных данных, адаптер к [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory) обрабатывает запросы от сервера на выполнения манипуляций с данными в прикладной системе, а также обладает возможностью отслеживания изменений в прикладной системе и пересылку информации об изменениях в DIP сервер, при помощи брокера сообщений.



## Особенности

Особенностью данного адаптера является специфическая реализация отслеживания изменений, в сравнении с адаптерами работающими с базами данных прикладных систем на прямую. Отслеживание реализуется на механизме сценариев и триггеров, настраиваемых в разделах <u>*передача данных*</u> и <u>*основная модель*</u>, соответственно. При истечении заданного интервала времени производится запрос к [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory) и получаются изменённые данные, настроенные в триггере модели интеграции, за период времени от предыдущего запроса. После обработки данных запоминается время выполнения текущего запроса, для выборки по нему изменений в следующем запросе.

Для работы механизма отслеживания, в его конфигурации адаптера к [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory) необходимо подключить микросервис `T2.DIP.Adapter.AD.MetadataProvider.AdMetadataProvider` и в его настройках добавить в список `Jobs` задачу `TransferChangedDataAd`.



## Права доступа к информационной системе

Для полноценной работы адаптер к [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory) следует запускать от имени пользователя, имеющим полный доступ для редактированию данных на заданных в его конфигурации ветках [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory).



## Параметры конфигурации

Параметры конфигурации адаптера к [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory) содержит специфические настройки микросервисов, в дополнении к общей [конфигурации адаптеров](https://docs.t2plus.ru/integration/adapters/configuration.html).

К основным микросервисам определяющим работу всего адаптера [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory) можно отнести следующие:

```json
{
	"Services": [
		{	// Сервис предоставления сведений об информационной сиситеме.
			"AssemblyQualifiedName": "T2.DIP.Adapter.AD.Services.InformationSystemService.AdInformationSystemService, T2.DIP.Adapter.AD",
			"Settings": {
				"LdapServer": "10.1.12.40",
				"CurrentUser": "True",
				"MainNode": "OU=T2Soft,DC=test,DC=local",
				"ChangeTrackingNodes": "OU=T2Soft,DC=test,DC=local;OU=Отделы,OU=T2Soft,DC=test,DC=local",
				"DeletedRecordsNode": "CN=Deleted Objects,DC=test,DC=local"
			}
		},
		{	// Сервис предоставления метаданных и манипуляции ими.
			"AssemblyQualifiedName": "T2.DIP.Adapter.AD.MetadataProvider.AdMetadataProvider, T2.DIP.Adapter.AD",
			"Settings": {
				"HeartbeatInterval": 5000,
				"Jobs": [
					"TransferChangedDataAd",
					"TransferDataByCondition",
					"RunExtension",
					"LoadFromXml"
				]
			}
		},
		{	// Сервис предварительной подготовки адаптера, генерации метаданных.
			"AssemblyQualifiedName": "T2.DIP.Adapter.AD.Services.Prepare.AdPreparerService, T2.DIP.Adapter.AD",
			"Settings": {
				"ModelClasses": [
					"OrganizationUnit",
					"User",
					"Group"
				]
			}
		}
    ]
}
```

Описанный выше код файла *appsettings.json* / *appsettings.`{EnvironmentName}`.json*, содержит описание микросервисов:

- `T2.DIP.Adapter.AD.Services.InformationSystemService.AdInformationSystemService` - сервис предаставляющий доступ к инфонмационной системе ([Active Directory](https://ru.wikipedia.org/wiki/Active_Directory)) и позвалающий взаимодействие с ней. Конфигурация данного сервиса определяется следующими свойствами:
  - `LdapServer` - IP-адрес или имя сервера, на котором развернут [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory);
  - `CurrentUser` - задаёт пользователя, от имени которого адаптер будет подключаться к информационной системе. Если `"CurrentUser": "True"`, то подключение будет производится от имени того пользовател, от которого запущена служба адаптера, иначе потребуется указать пользователя в свойстве `UserName` и указать `password`, если необходимо;
  - `MainNode` - корневая рабочая ветка в [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory) для адаптера;
  - `ChangeTrackingNodes` - списко веток в [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory), указывается через точку с запятой, в которых будет происходить отслеживание изменения, создания и перемещения объектов;
  - `DeletedRecordsNode` - списко веток в [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory), указывается через точку с запятой, в которых будет происходить отслеживание удаления объектов.

- `T2.DIP.Adapter.AD.MetadataProvider.AdMetadataProvider` - Сервис предоставляет метаданные информационной системы. Конфигурация данного сервиса определяется следующими свойствами:
  - `HeartbeatInterval` - интервал пересылки статуса жизнедейтельности текущего адаптера (задаётся в миллисекундах);
  - `Jobs` - список доступных для выполнения задач. Например задача `TransferChangedDataAd`, указаннная в коде конфигурации выше, представляет собой мехонизм отслеживания и пересылки статусов изменения в объектах информационной системы.

- `T2.DIP.Adapter.AD.Services.Prepare.AdPreparerService` - Сервис генерации классов метаданных по представлению схемы в *ActiveDirectory*.  В конфигурации данного сервиса указывается список (свойство `ModelClasses`) необходимых [классов](https://docs.microsoft.com/ru-ru/windows/win32/adschema/classes-all), для последующей работы с ними в модели интеграции.