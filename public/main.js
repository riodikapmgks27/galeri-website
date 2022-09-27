// * INISIALISASI
const ulasan = document.getElementById("ulasan");
const isiNama = document.getElementById("isiNama");
const isiUlasan = document.getElementById("isiUlasan");
const nama = document.getElementById("nama");

  // * TAMPILKAN DATA SAAT LOAD --
  // * -----------------------------------------------------
  fetch("/ulasan") 
      .then(res => res.json())
      .then(data => {
        let isi = ''
        for (let i = 0; i < data.length; i++){

          isi +=  `
          <h5>${data[i].nama}<br> </h5>
          <p">"${data[i].isi}"<br><br> <hr> </p>
          `;

        }
        isiUlasan.innerHTML = isi;
      })
  // * -----------------------------------------------------

  // * KIRIM DATA --
  // * -----------------------------------------------------
  function ulas() {
    
    const isi = {nama: nama.value, isi: ulasan.value}
    // const obj = JSON.stringify(isi)
    const options = {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(isi)
    }
    
    // * TAMPILKAN DATA SAAT TOMBOL DITEKAN --
    // * -----------------------------------------------------
    fetch("/ulasan", options) 
    .then(res => res.json())
      .then(data => {
        let isi = ''
        for (let i = 0; i < data.length; i++){
          isi +=  `
          <h5>${data[i].nama}<br> </h5>
          <p>"${data[i].isi}"<br><br> <hr> </p>
          `;
        }
        isiUlasan.innerHTML = isi;
      })
      // .then(x => console.log(x))
      // console.log("Yahya")
      // console.log(ulasan.value)
    }
    // * -----------------------------------------------------