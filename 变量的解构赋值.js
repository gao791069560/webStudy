// let a = 1;
// let b = 2;
// let c = 3;
// console.log(a,b,c);
/*
   从数组中提取值，按照对应位置给变量赋值
   只要等号两边的模式相同，左边的变量就会被赋予对应的值
 */
let [a, b, c] = [1, 2, 3];
// console.log(a,b,c);
let [pig, [[cat], dog]] = ['猪', [['猫'], '狗']];
// console.log(pig,cat,dog)
let [people, , mer] = ['人', '马', '牛']
// console.log(people,mer)
let [, , third] = ["1", "2", "3"]
// console.log(third)
let [head, ...tails] = [1, 2, 3, 4]
// console.log(tail)
let [x, y, ...z] = [1]
// console.log(x,y,z)
//解构不成功  foo 和t的值都会为undefined
let [foo] = []
let [bar, t] = ['1']
// console.log(foo,bar,t)
/* 如果等号右边不为数组(严格来说为不可遍历结构，会报错),只要某种数据结构具有Iterator接口，就可以采取
数组结构的解构赋值
*/
/*
    变量的解构赋值，指定默认值     当一个数组成员严格等于undefined，默认值才会生效
 */
let [moo = true] = []
// console.log(moo)//true
// let [x = 1] = [undefined];
// x // 1
// let [f = 1] = [null]; null不严格等于undefined 所以默认值1不生效
// console.log(f) // null
/*
   如果默认值为表达式，那么这个表达式为惰性求值 只有在用到的时候才会求值
 */
function f(){
  console.log('f()')
}
let [w = f()] = [1]


