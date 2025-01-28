const resources = [
  { id: 1, name: "Яблоко", image: "apple.png" },
  { id: 2, name: "Морковь", image: "carrot.png" },
  { id: 3, name: "Дерево", image: "tree.png" },
];

const combinations = [
  { ingredients: [1, 2], result: "Сок", image: "juice.png" },
  { ingredients: [2, 3], result: "Салат", image: "salad.png" },
];

let inventory = [];
let currentTask = { required: "Сок", reward: "10 монет" };

function displayResources() {
  const resourcesContainer = document.getElementById("resources");
  resourcesContainer.innerHTML = "";
  resources.forEach(resource => {
    const resourceElement = document.createElement("div");
    resourceElement.className = "resource";
    resourceElement.innerHTML = `
      <img src="${resource.image}" alt="${resource.name}">
      <p>${resource.name}</p>
    `;
    resourceElement.addEventListener("click", () => collectResource(resource.id));
    resourcesContainer.appendChild(resourceElement);
  });
}

function collectResource(resourceId) {
  inventory.push(resourceId);
  alert(`Вы собрали: ${resources.find(r => r.id === resourceId).name}`);
}

document.getElementById("combine-button").addEventListener("click", () => {
  const combination = combinations.find(comb =>
    comb.ingredients.every(ing => inventory.includes(ing))
  );
  if (combination) {
    inventory = inventory.filter(id => !combination.ingredients.includes(id));
    alert(`Вы создали: ${combination.result}`);
    checkTask(combination.result);
  } else {
    alert("Недостаточно ресурсов для создания предмета!");
  }
});

function checkTask(item) {
  if (item === currentTask.required) {
    alert(`Задание выполнено! Награда: ${currentTask.reward}`);
    generateNewTask();
  }
}

function generateNewTask() {
  const randomCombination = combinations[Math.floor(Math.random() * combinations.length)];
  currentTask = { required: randomCombination.result, reward: "10 монет" };
  document.getElementById("current-task").innerHTML = `
    <p>Создайте: ${currentTask.required}</p>
    <p>Награда: ${currentTask.reward}</p>
  `;
}

function initGame() {
  displayResources();
  generateNewTask();
}

initGame();