import Web3 from "web3";

export const mapToFront = (amount: BigInt) => {
    let ethRounded = "0";

    const eth = Web3.utils.fromWei(Number(amount), "ether");
    if (parseFloat(eth) > 0) {
        ethRounded = parseFloat(eth).toFixed(5);
    }
    return parseFloat(ethRounded);

}
export const mapToBlockchain = (amount: string) => {
    const wei = Web3.utils.toWei(Number(amount), "ether");
    return wei

}
