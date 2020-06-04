const list = document.getElementById("file_list");

async function load_file_list() {
  const response = await fetch("/loadlist");
  const { data } = await response.json();

  for (let i = 0; i < data.length; i++) {
    list.innerHTML += `<a href="/${data[i]}">${data[i]}</a><br>`;
  }
}

load_file_list();
