// module.exports = {
//   configureWebpack: {
//     resolve: { 
//       alias: { //配置路径别名相关的信息
//         // @已经默认配置了为src
//         'assets' : '@/assets',
//         'common' : '@/common',
//         'components' : '@/components',
//         'network' : '@/network',
//         'views' : '@/views',
//       }
//     }
//   }
 
// }

const path = require('path');
module.exports = {
	
	chainWebpack: (config)=>{
	    config.resolve.alias
	      .set('@$', path.join(__dirname,'src'))
	      .set('components', path.join(__dirname,'src/components'))
	      .set('common', path.join(__dirname,'src/common'))
	      .set('network', path.join(__dirname,'src/network'))
	      .set('assets', path.join(__dirname,'src/assets'))
	      .set('views', path.join(__dirname,'src/views'))
  	},
	
}
