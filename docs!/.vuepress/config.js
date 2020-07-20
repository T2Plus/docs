const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Документация',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
	['link', { rel: "shortcut icon", href: "/favicon.ico"}],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
	logo: '/Т2Plus.svg',
    repo: 't2softuser/docs',
	
	//docsRepo: 't2softuser/docs',
	//docsDir: 'docs',
	docsBranch: 'develop',
    editLinks: true,    
    editLinkText: 'Помоги нам улучшить эту страницу!',
    lastUpdated: 'Last Updated',
	nextLinks: true,
    // default value is true. Set it to false to hide prev page links on all pages
    prevLinks: true,
    nav: [
	  { text: 'Домой', link: 'https://t2plus.ru/', target:'_self', rel:''  },	  
      { text: '', link: '/integration/'},
      // {
        // text: 'Config',
        // link: '/config/'
      // },
      // {
        // text: 'VuePress',
        // link: 'https://v1.vuepress.vuejs.org'
      // }
    ],	
	displayAllHeaders : false,
	sidebar: [
		{
			title: 'Т2 Интеграция',   // required
			path: '/integration/',      // optional, link of the title, which should be an absolute path and must exist
			collapsable: false, // optional, defaults to true
			sidebarDepth: 0,    // optional, defaults to 1
			children: [				
				'/integration/terms',
				'/integration/commoninfo',
				'/integration/howitworks',
				{
					title: 'Начало работы',
					// path: '/integration/gettingstarted/',
					collapsable: true,
					children: [
					  '/integration/gettingstarted/prerequisites',
					  '/integration/gettingstarted/setup',
					  '/integration/gettingstarted/helloworld'
					]
				},
				'/integration/systemmetadata',
				{
					title: 'Модель интеграции',
					// path: '/integration/gettingstarted/',
					collapsable: true,
					children: [
						'/integration/model/systems',
						'/integration/model/entities',
						'/integration/model/masterkeys',
						'/integration/model/pipelines',
						'/integration/model/filters',
						'/integration/model/mappings',
						'/integration/model/extensions',
						'/integration/model/usermodel',
						'/integration/model/workmodel',
						'/integration/model/ba',
						'/integration/model/triggers',
						'/integration/model/order',
						'/integration/model/activation',
						'/integration/model/history'				
					]
				},								
				'/integration/schedules',
				'/integration/components',
				{
					title: 'Сервер настройки',
					// path: '/integration/gettingstarted/',
					collapsable: true,
					children: [
						'/integration/dipserver/monitoring',
						'/integration/dipserver/integrationsettings',
						'/integration/dipserver/infrastructure',
						'/integration/dipserver/administration'					
					]
				},												
				{
					title: 'Адаптеры',
					// path: '/integration/gettingstarted/',
					collapsable: true,
					children: [
						'/integration/adapters/dbadapter',
						'/integration/adapters/odataadapter',
						'/integration/adapters/adadapter',
						'/integration/adapters/1cadapter',
						'/integration/adapters/galammadapter',
						'/integration/adapters/galeamadapter',
						'/integration/adapters/galerpadapter',
						'/integration/adapters/galfmadapter',
						'/integration/adapters/galhcmadapter',
						'/integration/adapters/t2apmadapter',
						'/integration/adapters/t2erpadapter',
						'/integration/adapters/t2spmadapter'					
					]
				},					
				'/integration/keylocator',			
			]
		}
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
	'@vuepress/last-updated'
  ]
}
