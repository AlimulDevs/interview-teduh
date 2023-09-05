function encodeBaju(batasHargaJual, hargaJualIdeal, hargaDitawar) {

    const stringEncode = "TEDUHASYIK"
    const nilaiString = {};

    for (let index = 0; index < stringEncode.length; index++) {
        nilaiString[stringEncode[index]] = index

    }

    const CodeToPrice = (harga) => {
        let code = "";
        for (let i = 0; i < harga.length; i++) {
            code += nilaiString[harga[i]];
        }

        return Number(code + "000");
    };

    const batasHarga = CodeToPrice(batasHargaJual);
    const hargaIdeal = CodeToPrice(hargaJualIdeal);


    if (hargaDitawar < batasHarga) {
        return "REJECT, belum balik modal nih!";
    } else if (hargaDitawar < hargaIdeal) {
        return "ACCEPT, terima kasih sudah berbelanja";
    } else if (hargaDitawar === hargaIdeal) {
        return "GOOD, customer terbaik gak pake nawar";
    } else if (hargaDitawar > hargaIdeal) {
        const kembalian = hargaDitawar - hargaIdeal
        return `VERY GOOD, uang customer kelebihan Rp.${kembalian}`

    }
}

console.log(encodeBaju("AT", "YH", 70000));
console.log(encodeBaju("ESH", "DTT", 150000));
console.log(encodeBaju("DET", "DHT", 240000));
console.log(encodeBaju("DET", "DHT", 250000));

