const form = document.getElementById('guest-form');
const guestInput = document.getElementById('guest-name');
const guestCategory = document.getElementById('guest-category');
const guestList = document.getElementById('guest-list');

let guests = [];

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = guestInput.value.trim();
  const category = guestCategory.value;

  if (name === '') return;

  if (guests.length >= 10) {
    alert('You can only add up to 10 guests!');
    return;
  }

  const guest = {
    id: Date.now(),
    name: name,
    category: category,
    attending: true,
    timestamp: new Date().toLocaleTimeString()
  };

  guests.push(guest);
  guestInput.value = '';
  renderGuestList();
});

function renderGuestList() {
  guestList.innerHTML = ''; 

  guests.forEach(guest => {
    const li = document.createElement('li');
    const info = document.createElement('div');
    const name = document.createElement('strong');
    name.textContent = guest.name;
    const status = document.createElement('span');
    status.textContent = guest.attending ? ' (Attending)' : ' (Not Attending)';
    status.style.marginLeft = '5px';
    status.style.fontStyle = 'italic';
    const time = document.createElement('small');
    time.textContent = `Added at: ${guest.timestamp}`;
    time.style.display = 'block';
    time.style.marginTop = '5px';
    info.appendChild(name);
    info.appendChild(status);
    info.appendChild(time);

    const tag = document.createElement('span');
    tag.className = `tag ${guest.category}`;
    tag.textContent = guest.category;

    const buttons = document.createElement('div');
    buttons.className = 'buttons';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle RSVP';
    toggleBtn.addEventListener('click', () => {
      guest.attending = !guest.attending;
      renderGuestList();
    })

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      const newName = prompt("Enter a new name:", guest.name);
      if (newName && newName.trim() !== '') {
        guest.name = newName.trim();
        renderGuestList();
      }
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      guests = guests.filter(g => g.id !== guest.id);
      renderGuestList();
    });

    buttons.appendChild(toggleBtn);
    buttons.appendChild(editBtn);
    buttons.appendChild(removeBtn);

    li.appendChild(info);
    li.appendChild(tag);
    li.appendChild(buttons);
    guestList.appendChild(li);
  });
}
