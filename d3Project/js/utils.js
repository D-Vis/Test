/**
 * Created by Seimei on 2/15/16 */

function getRandomNum (min, max) {
   return function () {

       if (min > max) {
           var tmp = min;
           min = max;
           max = min;
       } else if (min == max) {
           return min;
       } else {
           var num = Math.random() * (max - min);
           if (min === parseInt(min) && max === parseInt(max))
               return Math.floor(num) + min;
           else
               return num + min;
       }
   }
}