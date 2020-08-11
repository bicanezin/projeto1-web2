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
  const { hashid, url } = data;
  newUrl = "https://rel.ink/" + hashid;

  const newLine =
    "<tr>" +
    `<td><a id="shortened_link" href=${newUrl} target="_blank">${newUrl}</a>` +
    `<td><img src="images/copy.png" id="btn_copy" width="23" height="23"> ` +
    `<td><img src="images/see_more.png" id="btn_see_more" width="23" height="23"> ` +
    "</tr>";
  $("#url").val("");
  $(".table-primary > tbody > tr:last").after(newLine);

  document.getElementById("btn_copy").addEventListener("click", btnCopyOnClick);
};

const btnCopyOnClick = () => {
  const link = document.getElementById("shortened_link");
  const range = document.createRange();
  range.selectNode(link);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
};

const btnSeeMoreOnClick = ({ hashid }) => {
  $.ajax({
    method: "GET",
    url: `https://rel.ink/api/links/${hashid}`,

    success: function (response) {
      console.log("[OK] Detalhes do link obtidos com sucesso");
      fillLinkDetailsTable({ data: response });
    },

    error: function (error) {
      console.log("[ERRO] Erro ao obter os detalhes do link");
      console.log(error);
    },
  });
};
