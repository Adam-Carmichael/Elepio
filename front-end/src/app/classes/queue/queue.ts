class QueueNode<T>{
    val: T;
    next: QueueNode<T> | null = null;

    constructor(val: T) {
        this.val = val;
    }
}


export class Queue<T>{
    private start: QueueNode<T> | null = null;
    private end: QueueNode<T> | null = null;
    private length: number = 0;

    constructor() { }

    push(val: T) {
        if (this.start == null) {
            this.start = new QueueNode<T>(val);
            this.end = this.start;
        }
        else {
            var newNode = new QueueNode<T>(val);

            if (this.end) {
                this.end.next = newNode;
                this.end = newNode;
            }
            else {
                this.end = newNode;
            }
        }
        this.length++;
    }

    pop(): T | null {
        if (this.start == null) {
            return null;
        }
        else {
            var poppedNode = this.start;
            this.start = this.start.next;

            //If start is now empty, reset end
            if (!this.start) {
                this.end = this.start;
            }

            this.length--;
            return poppedNode.val;
        }
    }

    /**
     * 
     * @param index of value to be removed
     * @returns removed value
     */
    removeIndex(i: number): T | null {
        if (i < 0 || i >= this.length || this.start == null) {
            return null;
        }
        if (i == 0) {
            return this.pop();
        }

        var counter = 1;
        var prevNode = this.start;
        var currNode = prevNode.next;

        while (currNode != null && i < this.length) {
            if (i == counter) {
                var removedNode = currNode;
                prevNode.next = currNode.next;

                if(i == this.length-1){
                    this.end = prevNode;
                }
                return removedNode.val;
            }
            counter++;
            prevNode = currNode;
            currNode = currNode.next;
        }

        return null;
    }

    forEach(callback: (element: T, index: number) => void) {
        var currNode = this.start;
        var counter = 0;
        while (currNode != null) {
            callback(currNode.val,counter);
            currNode = currNode.next;
            counter++;
        }
    }

    getLength() {
        return this.length;
    }

    printAll() {
        var str: string = "";
        var currNode = this.start;

        while (currNode != null) {
            str += currNode.val;
            if (currNode.next != null) {
                str += " --> ";
            }
            currNode = currNode.next;
        }
    }
}
