const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'app');

const filesToUpdate = [
  'splash.tsx',
  'settings.tsx',
  'select-users.tsx',
  'notifications.tsx',
  'login.tsx',
  'groups.tsx',
  'create-meeting.tsx',
  'create-group.tsx',
  'chat-info-modal.tsx'
];

// Mappings
// Light backgrounds -> white
// Primary -> blue
// Dark -> dark-blue
const replacements = [
  { regex: /sky-50\b/g, replacement: 'white' },
  { regex: /sky-100\b/g, replacement: 'white' },
  { regex: /sky-200\b/g, replacement: 'white' },
  
  { regex: /sky-300\b/g, replacement: 'blue' },
  { regex: /sky-400\b/g, replacement: 'blue' },
  { regex: /sky-500\b/g, replacement: 'blue' },
  { regex: /sky-600\b/g, replacement: 'blue' },

  { regex: /sky-700\b/g, replacement: 'dark-blue' },
  { regex: /sky-800\b/g, replacement: 'dark-blue' },
  { regex: /sky-900\b/g, replacement: 'dark-blue' },
  { regex: /sky-950\b/g, replacement: 'dark-blue' }
];

filesToUpdate.forEach(file => {
  const filePath = path.join(directoryPath, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    replacements.forEach(({ regex, replacement }) => {
      content = content.replace(regex, replacement);
    });

    if (original !== content) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});
