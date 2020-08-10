const shortenURL = () => {
  const url = $("#url").val();

  $.ajax({
    method: "POST",
    url: "https://rel.ink/api/links/",
    data: {
      url,
    },

    success: function (response) {
      console.log("[OK] Encurtou o link");
      insertDataTable({ data: response });
    },

    error: function (error) {
      console.log("[ERRO] Erro ao encurtar o link");
      console.log(error);
    },
  });
};

const insertDataTable = ({ data }) => {
  const { hashid } = data;
  newUrl = "https://rel.ink/" + hashid;

  const newLine =
    "<tr>" +
    `<td><a href=${newUrl}>${newUrl}</a>` +
    `<td><img onclick="onClick('${hashid}')"  src="images/copy-link.png" width="23" height="23"> ` +
    `<td><img onclick="urlDetails('${hashid}')" id="detailsImg" src="images/info.png" width="23" height="23"> 
  ` +
    "</tr>";
  $("#url").val("");
  $(".table-primary > tbody > tr:last").after(newLine);

  // document.querySelector("img").addEventListener("click", onClick(hashid));
  // document.querySelector("#detailsImg").addEventListener("click", urlDetails);
};

const onClick = (hashid) => {
  console.log(document.querySelector("a"))
  const link = document.querySelector("a");
  const range = document.createRange();
  range.selectNode(link);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  const successful = document.execCommand("copy");
};

const urlDetails = (hashid) => {
  $.ajax({
    method: "GET",
    url: "https://rel.ink/api/links/" + hashid,

    success: function (response) {
      console.log(response.hashid);
    },

    error: function (error) {
      console.log(error);
    },
  });

  document.onclick = function () {
    document.getElementById("tooltip").style.display = "none";
  };

  document.getElementById("tooltip").onclick = function (e) {
    e.stopPropagation();
  };

  document.getElementById("detailsImg").onclick = function (e) {
    document.getElementById("tooltip").style.display = "block";
    e.stopPropagation();
  };
};
