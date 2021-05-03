function getDataFromURL (url) {
  var course = url.substring(url.indexOf('/courses/') + 9, url.indexOf('/gradebook/'));
  var assignment = url.substring(url.indexOf('assignment_id=') + 14, url.indexOf('&student_id'));
  var student = url.substring(url.indexOf('student_id=') + 11);
  return {
    course: course,
    assignment: assignment,
    student: student
  }
}
window.onload = () => {
  var style = `background:linear-gradient(65deg, #0270D7 0, #0F8AFD 100%);color:white;`;
  if (window.location.href.match(new RegExp('https:\\/\\/.*\\.instructure\\.com\\/courses\\/[0-9]*\\/gradebook\\/speed_grader\\?assignment_id=[0-9]*&student_id=[0-9]*')) !== null) {
    var parent = document.querySelector('#reassign_assignment_wrapper');
    var data = getDataFromURL(window.location.href);
    var swap = `() => {
      console.log('Swap');
        fetch('https://' + location.host + '/api/v1/courses/${data.course}/assignments/${data.assignment}/submissions/${data.student}').then(a => a.json()).then(json => {
          if (json.attachments && json.attachments.length > 0) {
            var url = json.attachments[0].url;
            document.querySelector('#speedgrader_iframe').src = 'https://docs.google.com/gview?url=' + encodeURIComponent(url) + '&embedded=true';
          }
        });
    }`;
    parent.innerHTML += `<button style="${style}" id="swap_canvasdoc" class="Button" onclick="(${swap})();">Use BetterDocViewer</button>`;
  }
  document.getElementById('next-student-button').onclick = (() => {
    if (window.location.href.match(new RegExp('https:\\/\\/.*\\.instructure\\.com\\/courses\\/[0-9]*\\/gradebook\\/speed_grader\\?assignment_id=[0-9]*&student_id=[0-9]*')) !== null) {
      document.querySelector('#swap_canvasdoc').remove();
      var parent = document.querySelector('#reassign_assignment_wrapper');
      var data = getDataFromURL(window.location.href);
      var swap = `() => {
        fetch('https://' + location.host + '/api/v1/courses/${data.course}/assignments/${data.assignment}/submissions/${data.student}').then(a => a.json()).then(json => {
          if (json.attachments && json.attachments.length > 0) {
            var url = json.attachments[0].url;
            document.querySelector('#speedgrader_iframe').src = 'https://docs.google.com/gview?url=' + encodeURIComponent(url) + '&embedded=true';
          }
        });
      }`;
      parent.innerHTML += `<button style="${style}" id="swap_canvasdoc" class="Button" onclick="(${swap})();">Use BetterDocViewer</button>`;
    }
  });
  document.getElementById('prev-student-button').onclick = (() => {
    if (window.location.href.match(new RegExp('https:\\/\\/.*\\.instructure\\.com\\/courses\\/[0-9]*\\/gradebook\\/speed_grader\\?assignment_id=[0-9]*&student_id=[0-9]*')) !== null) {
      document.querySelector('#swap_canvasdoc').remove();
      var parent = document.querySelector('#reassign_assignment_wrapper');
      var data = getDataFromURL(window.location.href);
      var swap = `() => {
        fetch('https://' + location.host + '/api/v1/courses/${data.course}/assignments/${data.assignment}/submissions/${data.student}').then(a => a.json()).then(json => {
          if (json.attachments && json.attachments.length > 0) {
            var url = json.attachments[0].url;
            document.querySelector('#speedgrader_iframe').src = 'https://docs.google.com/gview?url=' + encodeURIComponent(url) + '&embedded=true';
          }
        });
      }`;
      parent.innerHTML += `<button style="${style}" id="swap_canvasdoc" class="Button" onclick="(${swap})();">Use BetterDocViewer</button>`;
    }
  });
  setTimeout(() => {
    document.querySelectorAll("#students_selectmenu-menu > li").forEach(elem => elem.onclick = (() => {
      if (window.location.href.match(new RegExp('https:\\/\\/.*\\.instructure\\.com\\/courses\\/[0-9]*\\/gradebook\\/speed_grader\\?assignment_id=[0-9]*&student_id=[0-9]*')) !== null) {
        document.querySelector('#swap_canvasdoc').remove();
        var parent = document.querySelector('#reassign_assignment_wrapper');
        var data = getDataFromURL(window.location.href);
        var swap = `() => {
          fetch('https://' + location.host + '/api/v1/courses/${data.course}/assignments/${data.assignment}/submissions/${data.student}').then(a => a.json()).then(json => {
            if (json.attachments && json.attachments.length > 0) {
              var url = json.attachments[0].url;
              document.querySelector('#speedgrader_iframe').src = 'https://docs.google.com/gview?url=' + encodeURIComponent(url) + '&embedded=true';
            }
          });
        }`;
        parent.innerHTML += `<button style="${style}" id="swap_canvasdoc" class="Button" onclick="(${swap})();">Use BetterDocViewer</button>`;
      }
    }));
  }, 1000);
}
