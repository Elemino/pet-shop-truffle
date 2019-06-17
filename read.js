const ethers = require('ethers')
const {formatEther} = ethers.utils
const fs = require('fs')
let provider = new ethers.providers.InfuraProvider('mainnet')

const abi = [
    "function exploreBalances(address[] users) external view returns (uint256[] balances)"
]

const address = ""
const contract = new ethers.Contract(address, abi, provider)

async function main() {
    let addresses = fs.readFileSync('./addresses.csv', {encoding: 'utf8'})
    addresses = addresses.split('\n')
    let balances = await contract.exploreBalances(addresses)
    let addressesWithBalances = []
    balances.forEach((balance, index) => 
        {
            return addressesWithBalances.push({
                address: addresses[index], balance: formatEther(balance)
            })
        }
    )
    
    console.log(addressesWithBalances)

}

main()