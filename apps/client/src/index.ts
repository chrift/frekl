// import prodClient from './prod'
//
// let client = prodClient
//
// const run = async () => {
//   if (process.env.NODE_ENV === 'development') {
//     client = (await import('./dev')).default
//   }
// }
//
// run()

export default process.env.NODE_ENV === 'production' ? require('./prod') : require('./dev')
