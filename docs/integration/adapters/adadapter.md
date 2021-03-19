---
id: adadapter
title: Адаптер к Active Directory
---

## Назначение

**Адаптер к Active Directory** - позволяет подключать [службу каталогов](https://ru.wikipedia.org/wiki/Служба_каталогов) корпорации [Microsoft](https://ru.wikipedia.org/wiki/Microsoft) для операционных систем семейства [Windows Server](https://ru.wikipedia.org/wiki/Windows_Server) к **Т2 Интеграция**.

Поддерживаются предустановленные [Active Directory](https://ru.wikipedia.org/wiki/Active_Directory) с версии *Windows Server 2008 R2*.



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