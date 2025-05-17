
function startBuilder() {
  document.getElementById('builderSection').style.display = 'block';
}

function addExperience() {
  const div = document.createElement('div');
  div.classList.add('exp-entry');
  div.innerHTML = \`
    <input type="text" placeholder="Job Title" class="jobTitle" />
    <input type="text" placeholder="Company Name" class="company" />
    <input type="text" placeholder="Duration" class="duration" />
    <textarea placeholder="Job Details" class="jobDetails" rows="3"></textarea>\`;
  document.getElementById('experienceSection').appendChild(div);
}

function addEducation() {
  const div = document.createElement('div');
  div.classList.add('edu-entry');
  div.innerHTML = \`
    <input type="text" placeholder="Degree" class="degree" required />
    <input type="text" placeholder="Institution" class="institution" required />
    <input type="text" placeholder="Duration" class="eduDuration" required />
    <input type="text" placeholder="Grade (optional)" class="grade" />\`;
  document.getElementById('educationSection').appendChild(div);
}

function addProject() {
  const div = document.createElement('div');
  div.classList.add('project-entry');
  div.innerHTML = \`
    <input type="text" placeholder="Project Title" class="projectTitle" />
    <textarea placeholder="Project Description" class="projectDesc" rows="3"></textarea>
    <input type="text" placeholder="Project Link (optional)" class="projectLink" />\`;
  document.getElementById('projectSection').appendChild(div);
}

document.getElementById("resumeForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const output = document.getElementById("resumeOutput");
  const name = document.getElementById("fullName").value;
  const title = document.getElementById("title").value;
  const guardian = document.getElementById("guardian").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const github = document.getElementById("github").value;
  const profile = document.getElementById("profile").value;
  const skills = document.getElementById("skills").value;
  const languages = document.getElementById("languages").value;
  const hobbies = document.getElementById("hobbies").value;

  const imageInput = document.getElementById("profileImage");
  const imageURL = imageInput.files.length ? URL.createObjectURL(imageInput.files[0]) : "";

  let experienceHTML = "", educationHTML = "", projectHTML = "";

  document.querySelectorAll(".exp-entry").forEach(exp => {
    const jobTitle = exp.querySelector(".jobTitle").value;
    const company = exp.querySelector(".company").value;
    const duration = exp.querySelector(".duration").value;
    const jobDetails = exp.querySelector(".jobDetails").value;
    if (jobTitle || company || duration || jobDetails) {
      experienceHTML += \`<h5>\${jobTitle}</h5><p>\${company} | \${duration}</p><p>\${jobDetails}</p>\`;
    }
  });

  document.querySelectorAll(".edu-entry").forEach(edu => {
    const degree = edu.querySelector(".degree").value;
    const institution = edu.querySelector(".institution").value;
    const eduDuration = edu.querySelector(".eduDuration").value;
    const grade = edu.querySelector(".grade").value;
    educationHTML += \`<h5>\${degree}</h5><p>\${institution} | \${eduDuration} \${grade ? '| Grade: ' + grade : ''}</p>\`;
  });

  document.querySelectorAll(".project-entry").forEach(proj => {
    const title = proj.querySelector(".projectTitle").value;
    const desc = proj.querySelector(".projectDesc").value;
    const link = proj.querySelector(".projectLink").value;
    if (title || desc || link) {
      projectHTML += \`<h5>\${title}</h5><p>\${desc} \${link ? '<a href="' + link + '" target="_blank">(Link)</a>' : ''}</p>\`;
    }
  });

  output.innerHTML = \`
    <div class="resume">
      \${imageURL ? '<img src="' + imageURL + '" />' : ''}
      <h2>\${name}</h2>
      <h3>\${title}</h3>
      <p><strong>Guardian:</strong> \${guardian}</p>
      <p><strong>Email:</strong> \${email}</p>
      <p><strong>Phone:</strong> \${phone}</p>
      <p><strong>Address:</strong> \${address}</p>
      <p><strong>GitHub:</strong> <a href="\${github}" target="_blank">\${github}</a></p>
      <h4>Profile</h4><p>\${profile}</p>
      <h4>Skills</h4><p>\${skills}</p>
      <h4>Languages</h4><p>\${languages}</p>
      <h4>Hobbies</h4><p>\${hobbies}</p>
      \${experienceHTML ? '<h4>Experience</h4>' + experienceHTML : ''}
      \${educationHTML ? '<h4>Education</h4>' + educationHTML : ''}
      \${projectHTML ? '<h4>Projects</h4>' + projectHTML : ''}
    </div>
  \`;
});

document.getElementById("downloadBtn").addEventListener("click", function() {
  const output = document.getElementById("resumeOutput");
  html2pdf().from(output).save("resume.pdf");
});
