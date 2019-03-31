let customer1 = { name: 'Leo', email: 'leo@gmail.com' };
let customer2 = { name: 'Nat', email: 'nat@hotmail.com' };

function greeting(text) {
    console.log(`${text} ${this.name}`);
}

greeting.call(customer1, 'Hello'); // Hello Leo
greeting.call(customer2, 'Hello'); // Hello Nat



function greeting2(text, text2) {
   console.log(`${text} ${this.name}, ${text2}`);
}

greeting2.apply(customer1, ['Hello', 'How are you?']); // output Hello Leo, How are you?
greeting2.apply(customer2, ['Hello', 'How are you?']); // output Hello Natm How are you?




function greeting3(text) {
   console.log(`${text} ${this.name}`);
}

let helloLeo = greeting3.bind(customer1);
let helloNat = greeting3.bind(customer2);

helloLeo('Hello'); // Hello Leo
helloNat('Hello'); // Hello Nat


Function.prototype.bind = function(context) {
    var fn = this;
    return function() {
        fn.apply(context, arguments);
    };
};
