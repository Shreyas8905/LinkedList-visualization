class SinglyLinkedList {
    constructor() { this.head = null; }
    add(value) {
        const newNode = { value, next: null };
        if (!this.head) this.head = newNode;
        else {
            let current = this.head;
            while (current.next) current = current.next;
            current.next = newNode;
        }
    }
    remove() {
        if (!this.head) return;
        if (!this.head.next) this.head = null;
        else {
            let current = this.head;
            while (current.next && current.next.next) current = current.next;
            current.next = null;
        }
    }
    getNodes() {
        let nodes = [];
        let current = this.head;
        while (current) { nodes.push(current); current = current.next; }
        return nodes;
    }
}

class DoublyLinkedList {
    constructor() { this.head = null; this.tail = null; }
    add(value) {
        const newNode = { value, next: null, prev: null };
        if (!this.head) { this.head = this.tail = newNode; }
        else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }
    remove() {
        if (!this.tail) return;
        if (this.head === this.tail) { this.head = this.tail = null; }
        else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
    }
    getNodes() {
        let nodes = [];
        let current = this.head;
        while (current) { nodes.push(current); current = current.next; }
        return nodes;
    }
}

// Class definitions for Circular Linked Lists remain the same as before

let listInstance;
updateListType();

function updateListType() {
    const listType = document.getElementById("listType").value;
    if (listType === "singly") listInstance = new SinglyLinkedList();
    else if (listType === "doubly") listInstance = new DoublyLinkedList();
    else if (listType === "circularSingly") listInstance = new CircularSinglyLinkedList();
    else if (listType === "circularDoubly") listInstance = new CircularDoublyLinkedList();
    displayList();
    displayAlgorithm(listType);
}

function addNode() {
    const value = document.getElementById("nodeValue").value;
    if (value) listInstance.add(value);
    document.getElementById("nodeValue").value = "";
    displayList();
}

function removeNode() {
    listInstance.remove();
    displayList();
}

function displayList() {
    const listOutput = document.getElementById("listOutput");
    listOutput.innerHTML = "";
    const nodes = listInstance.getNodes();

    nodes.forEach((node, index) => {
        const nodeDiv = document.createElement("div");
        nodeDiv.className = "node";
        nodeDiv.innerHTML = `
            <input type="text" value="${node.value}" onchange="updateNodeValue(this, '${node.value}')">
            <div class="pointer">Next: ${node.next ? node.next.value : 'null'}</div>
            ${node.prev !== undefined ? `<div class="pointer">Prev: ${node.prev ? node.prev.value : 'null'}</div>` : ''}
        `;
        listOutput.appendChild(nodeDiv);

        // Add arrows
        if (node.next) {
            const arrow = document.createElement("div");
            arrow.className = "arrow next-arrow";
            arrow.innerHTML = "↓";  // Stack arrows vertically for doubly linked list
            listOutput.appendChild(arrow);
        }

        if (node.prev && index > 0) {  
            const prevArrow = document.createElement("div");
            prevArrow.className = "arrow prev-arrow";
            prevArrow.innerHTML = "↑"; 
            listOutput.appendChild(prevArrow);
        }
    });
}

function updateNodeValue(input, oldValue) {
    let node = listInstance.head;
    while (node && node.value !== oldValue) node = node.next;
    if (node) node.value = input.value;
}

function displayAlgorithm(listType) {
    const algorithmOutput = document.getElementById("algorithmOutput");
    let pseudoCode;

    switch(listType) {
        case "singly":
            pseudoCode = `
Add Node:
1. Create a new node with the given value.
2. If the list is empty, set head to the new node.
3. Otherwise, traverse to the last node and set its 'next' to the new node.

Remove Node:
1. If the list is empty, return.
2. Traverse to the second-last node and set its 'next' to null.
`;
            break;

        case "doubly":
            pseudoCode = `
Add Node:
1. Create a new node with the given value.
2. If the list is empty, set head and tail to the new node.
3. Otherwise, set tail.next to the new node, and new node.prev to tail, then update tail.

Remove Node:
1. If the list is empty, return.
2. Update tail to tail.prev and set tail.next to null.
`;
            break;

        case "circularSingly":
            pseudoCode = `
Add Node:
1. Create a new node with the given value.
2. If the list is empty, set head to new node and new node.next to head.
3. Otherwise, traverse to last node and set its 'next' to new node, and new node.next to head.

Remove Node:
1. Traverse to the second-last node and set its 'next' to head.
`;
            break;

        case "circularDoubly":
            pseudoCode = `
Add Node:
1. Create a new node with the given value.
2. If the list is empty, set head to new node, and set new node.next and new node.prev to itself.
3. Otherwise, set tail.next to new node, new node.prev to tail, and update tail.

Remove Node:
1. Update head.prev to tail.prev and set tail.prev.next to head.
`;
            break;
    }

    algorithmOutput.innerText = pseudoCode;
}
