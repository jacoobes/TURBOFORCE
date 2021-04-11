let {
    allDBS: { accountDB },
} = require('.')

module.exports.updateBalance = function updateBalance({_id: _id, operator: operator, target: target, balance: balance}) {

accountDB.update({_id: _id}, {[`$${operator}`]: {[target]: balance }})
 
}

module.exports.Account = async function Account({_id: _id}) {

   let account = await new Promise( resolve => {accountDB.findOne({_id: _id}, function(err,docs){
        resolve(docs)
    })
  }) 
  return account

}
