const frekl = process.env.NODE_ENV === 'production' ? require('./prod').default : require('./dev').default

export { frekl }
export default frekl
module.exports = frekl
