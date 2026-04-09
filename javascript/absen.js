let siswa = ["Andi","Budi","Citra","Dewi","Eka","Fajar","Gina","Hadi","Intan","Joko"];

/* AMBIL DATA DARI LOCAL STORAGE */
let dataAbsensi = JSON.parse(localStorage.getItem("absensi")) || [];

let selectNama = document.getElementById("nama");

/* MEMASUKKAN NAMA SISWA KE SELECT */

siswa.forEach(function(nama){
let option = document.createElement("option");
option.value = nama;
option.textContent = nama;
selectNama.appendChild(option);
});

/* TAMPILKAN DATA SAAT HALAMAN DIBUKA */

updateTabel();
updateGrafik();

/* TAMBAH DATA */

function tambahData(){

let nama = document.getElementById("nama").value;
let status = document.getElementById("status").value;

if(nama === "" || status === ""){
alert("Pilih nama dan status");
return;
}

dataAbsensi.push({nama,status});

/* SIMPAN KE LOCAL STORAGE */

localStorage.setItem("absensi", JSON.stringify(dataAbsensi));

updateTabel();
updateGrafik();

}

/* UPDATE TABEL */

function updateTabel(){

let tabel = document.getElementById("tabel");

tabel.innerHTML = "";

dataAbsensi.forEach(function(data,index){

let row = `
<tr>
<td>${index+1}</td>
<td>${data.nama}</td>
<td>${data.status}</td>
<td><button onclick="hapus(${index})">Hapus</button></td>
</tr>
`;

tabel.innerHTML += row;

});

}

/* HAPUS DATA */

function hapus(index){

dataAbsensi.splice(index,1);

/* UPDATE STORAGE */

localStorage.setItem("absensi", JSON.stringify(dataAbsensi));

updateTabel();
updateGrafik();

}

/* UPDATE GRAFIK */

function updateGrafik(){

let hadir = dataAbsensi.filter(d=>d.status==="Hadir").length;
let izin = dataAbsensi.filter(d=>d.status==="Izin").length;
let sakit = dataAbsensi.filter(d=>d.status==="Sakit").length;
let alpha = dataAbsensi.filter(d=>d.status==="Alpha").length;

let total = dataAbsensi.length || 1;

let hadirPersen = Math.round(hadir/total*100);
let izinPersen = Math.round(izin/total*100);
let sakitPersen = Math.round(sakit/total*100);
let alphaPersen = Math.round(alpha/total*100);

document.getElementById("hadirBar").style.width = hadirPersen+"%";
document.getElementById("izinBar").style.width = izinPersen+"%";
document.getElementById("sakitBar").style.width = sakitPersen+"%";
document.getElementById("alphaBar").style.width = alphaPersen+"%";

document.getElementById("hadirText").innerText = hadirPersen+"%";
document.getElementById("izinText").innerText = izinPersen+"%";
document.getElementById("sakitText").innerText = sakitPersen+"%";
document.getElementById("alphaText").innerText = alphaPersen+"%";

}

/* SIDEBAR RESPONSIVE */

function toggleSidebar(){
document.getElementById("sidebar").classList.toggle("active");
}