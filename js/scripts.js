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
    `<td>${url}</td>` +
    `<td><a href=${newUrl}>${newUrl}</a>` +
    `<td><img src="images/copy-link.png" width="23" height="23"> ` +
    "</tr>";
  $("#url").val("");
  $(".table-primary > tbody > tr:last").after(newLine);

  document.querySelector("img").addEventListener("click", onClick);
};

const onClick = (evt) => {
  const link = document.querySelector("a");
  const range = document.createRange();
  range.selectNode(link);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  const successful = document.execCommand("copy");
};