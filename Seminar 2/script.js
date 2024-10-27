// Select the "All Complete" checkbox
function toggleAll(checkbox) {
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    taskCheckboxes.forEach((taskCheckbox) => {
        taskCheckbox.checked = checkbox.checked;
    });
}

// Add event listeners to individual checkboxes
const taskCheckboxes = document.querySelectorAll('.task-checkbox');
taskCheckboxes.forEach((taskCheckbox) => {
    taskCheckbox.addEventListener('change', () => {
        const checkAllCheckbox = document.getElementById('checkAll');
        checkAllCheckbox.checked = Array.from(taskCheckboxes).every(checkbox => checkbox.checked);
    });
});

// Proposal Upload Elements
const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('proposalUpload');
const browseLink = document.getElementById('browseLink');
const fileIcon = document.getElementById('fileIcon');
const progressBar = document.getElementById('progressBar');
const uploadProgress = document.getElementById('uploadProgress');
const fileNameDisplay = document.getElementById('fileName');
const cancelButton = document.getElementById('cancelButton');
const cancelIcon = document.getElementById('cancelIcon');

// Plagiarism Upload Elements
const plagUploadBox = document.getElementById('plagUploadBox');
const plagFileInput = document.getElementById('plagUpload');
const plagBrowseLink = document.getElementById('browseLinkPlag');
const plagFileIcon = document.getElementById('fileIconPlag');
const plagProgressBar = document.getElementById('progressBarPlag');
const plagUploadProgress = document.getElementById('uploadProgressPlag');
const plagFileNameDisplay = document.getElementById('fileNamePlag');
const plagCancelButton = document.getElementById('cancelButtonPlag');
const plagCancelIcon = document.getElementById('cancelIconPlag');

let proposalUploadInProgress = false;
let proposalUploadCanceled = false;
let proposalUploadInterval;

let plagUploadInProgress = false;
let plagUploadCanceled = false;
let plagUploadInterval;

// Highlight box when dragging over (Proposal)
uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = 'blue';
});

// Reset border color when drag leaves (Proposal)
uploadBox.addEventListener('dragleave', () => {
    uploadBox.style.borderColor = 'gray';
});

// Handle file drop (Proposal)
uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = 'gray';
    const file = e.dataTransfer.files[0];
    handleProposalFile(file);
});

// Open file browser when clicking 'Browse' (Proposal)
browseLink.addEventListener('click', (e) => {
    e.preventDefault();
    fileInput.click();
});

// Handle file selection via browsing (Proposal)
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    handleProposalFile(file);
});

// Function to handle proposal file and show progress
function handleProposalFile(file) {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (file && allowedTypes.includes(file.type)) {
        if (file.type === 'application/pdf') {
            fileIcon.className = 'bi bi-file-earmark-pdf';
        } else {
            fileIcon.className = 'bi bi-file-earmark-word';
        }

        fileNameDisplay.textContent = file.name;
        uploadProgress.style.display = 'flex';
        progressBar.style.width = '0%';
        progressBar.textContent = '0%';

        proposalUploadInProgress = true;
        proposalUploadCanceled = false;

        startProposalUploadProgress();
    } else {
        alert('Unsupported file type! Please upload a PDF or Word document.');
    }
}

// Function to simulate proposal upload progress
function startProposalUploadProgress() {
    let progress = 0;

    clearInterval(proposalUploadInterval);

    proposalUploadInterval = setInterval(() => {
        if (proposalUploadCanceled) {
            clearInterval(proposalUploadInterval);
            proposalUploadInProgress = false;
            resetProposalProgressBar();
            return;
        }

        progress += 10;
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', progress);
        progressBar.textContent = progress + '%';

        if (progress >= 100) {
            clearInterval(proposalUploadInterval);
            completeProposalUpload();
        }
    }, 500);
}

// Function to cancel proposal upload
function cancelUpload() {
    if (proposalUploadInProgress) {
        proposalUploadCanceled = true;
        proposalUploadInProgress = false;
        alert('Proposal upload canceled.');
    }
}

// Function to complete proposal upload
function completeProposalUpload() {
    proposalUploadInProgress = false;

    cancelButton.classList.remove('text-danger');
    cancelButton.classList.add('text-success');
    cancelIcon.className = 'bi bi-check-circle';
}

// Function to reset the proposal progress bar
function resetProposalProgressBar() {
    uploadProgress.style.display = 'none';
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';
    cancelButton.classList.remove('text-success');
    cancelButton.classList.add('text-danger');
    cancelIcon.className = 'bi bi-x-circle';
}

// --- Plagiarism Upload Logic --- //

// Highlight box when dragging over (Plagiarism)
plagUploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    plagUploadBox.style.borderColor = 'blue';
});

// Reset border color when drag leaves (Plagiarism)
plagUploadBox.addEventListener('dragleave', () => {
    plagUploadBox.style.borderColor = 'gray';
});

// Handle file drop (Plagiarism)
plagUploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    plagUploadBox.style.borderColor = 'gray';
    const file = e.dataTransfer.files[0];
    handlePlagFile(file);
});

// Open file browser when clicking 'Browse' (Plagiarism)
plagBrowseLink.addEventListener('click', (e) => {
    e.preventDefault();
    plagFileInput.click();
});

// Handle file selection via browsing (Plagiarism)
plagFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    handlePlagFile(file);
});

// Function to handle plagiarism file and show progress
function handlePlagFile(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (file && allowedTypes.includes(file.type)) {
        if (file.type === 'application/pdf') {
            plagFileIcon.className = 'bi bi-file-earmark-pdf';
        } else if (file.type.startsWith('image/')) {
            plagFileIcon.className = 'bi bi-file-earmark-image';
        } else {
            plagFileIcon.className = 'bi bi-file-earmark-word';
        }

        plagFileNameDisplay.textContent = file.name;
        plagUploadProgress.style.display = 'flex';
        plagProgressBar.style.width = '0%';
        plagProgressBar.textContent = '0%';

        plagUploadInProgress = true;
        plagUploadCanceled = false;

        startPlagUploadProgress();
    } else {
        alert('Unsupported file type! Please upload an image, PDF, or Word document.');
    }
}

// Function to simulate plagiarism upload progress
function startPlagUploadProgress() {
    let progress = 0;

    clearInterval(plagUploadInterval);

    plagUploadInterval = setInterval(() => {
        if (plagUploadCanceled) {
            clearInterval(plagUploadInterval);
            plagUploadInProgress = false;
            resetPlagProgressBar();
            return;
        }

        progress += 10;
        plagProgressBar.style.width = progress + '%';
        plagProgressBar.setAttribute('aria-valuenow', progress);
        plagProgressBar.textContent = progress + '%';

        if (progress >= 100) {
            clearInterval(plagUploadInterval);
            completePlagUpload();
        }
    }, 500);
}

// Function to cancel plagiarism upload
function cancelUploadPlag() {
    if (plagUploadInProgress) {
        plagUploadCanceled = true;
        plagUploadInProgress = false;
        alert('Plagiarism upload canceled.');
    }
}

// Function to complete plagiarism upload
function completePlagUpload() {
    plagUploadInProgress = false;

    plagCancelButton.classList.remove('text-danger');
    plagCancelButton.classList.add('text-success');
    plagCancelIcon.className = 'bi bi-check-circle';
}

// Function to reset the plagiarism progress bar
function resetPlagProgressBar() {
    plagUploadProgress.style.display = 'none';
    plagProgressBar.style.width = '0%';
    plagProgressBar.textContent = '0%';
    plagCancelButton.classList.remove('text-success');
    plagCancelButton.classList.add('text-danger');
    plagCancelIcon.className = 'bi bi-x-circle';
}

function promoteSeminar() {
    alert("Promote To Seminar II button clicked!");
}

