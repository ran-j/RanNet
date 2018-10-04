function Println(msg) {
    console.log(" ");
    console.log("Retornando HTM de "+msg+" as "+new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"));
}

module.exports = Println;