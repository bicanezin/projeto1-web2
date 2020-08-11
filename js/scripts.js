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
      fillTableWithAllLinks({ data: response });
    },

    error: function (error) {
      console.log("[ERRO] Erro ao encurtar o link");
      console.log(error);
    },
  });
};

const fillTableWithAllLinks = ({ data }) => {
  const { hashid } = data;
  newUrl = `https://rel.ink/${hashid}`;

  const newLine =
    "<tr>" +
    `<td><a id="shortened_link" href=${newUrl} target="_blank">${newUrl}</a>` +
    `<td><img src="images/copy.png" id="btn_copy" width="23" height="23"> ` +
    `<td><img src="images/see_more.png" id="btn_see_more" width="23" height="23"> ` +
    "</tr>";
  $("#url").val("");
  $(".table-primary > tbody > tr:last").after(newLine);

  const hashID = newUrl.split("/")[3];

  $("#btn_copy").click(() => {
    btnCopyOnClick({ element: "shortened_link" });
  });

  $("#btn_see_more").click(() => {
    btnSeeMoreOnClick({ hashid: hashID });
  });
};

const fillTableWithLinkDetails = ({ data }) => {
  const newLine =
    "<tr>" +
    `<td><a id="original_link" href=${data.url} target="_blank">${data.url}</a>` +
    `<td><img src="images/copy.png" id="btn_copy" width="23" height="23"> ` +
    `<td><a>${new Date(data.created_at).toLocaleDateString()}</a>` +
    "</tr>";
  $(".table-details > tbody > tr:last").empty();
  $(".table-details > tbody > tr:last").after(newLine);

  $("#btn_copy").click(() => {
    btnCopyOnClick({ element: "original_link" });
  });
};

const btnCopyOnClick = ({ element }) => {
  const link = document.getElementById(element);
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
      fillTableWithLinkDetails({ data: response });
    },

    error: function (error) {
      console.log("[ERRO] Erro ao obter os detalhes do link");
      console.log(error);
    },
  });
};
