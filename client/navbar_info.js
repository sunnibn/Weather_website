let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let DMY = document.getElementById('todayDMY');
let LW = document.getElementById('loca_weat');


DMY.insertAdjacentText('beforeend', d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear()+'   ');

