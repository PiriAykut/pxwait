
## install
> npm i jquery <br>
> npm i px-wait

## css
> @import "~px-wait/px-autocomplete.css";

## javascript - jquery
> require('px-autocomplete-jquery');


### init
> $("#objectid").pxautocomplete({ <br>
>            jsondata: [{ val: '1', image: null, text: 'value 1' }, ...],<br>
>            ajaxpage: 'stok/musteriara',<br>
>            name: "requestname",<br>
>            maxheight: '100',<br>
>            placeholder: '',<br>
>            registered_text: 'registered',<br>
>            new_text: 'new',<br>
>            alert_text: 'No record available!'<br>
>            style: "background:#fff; color:#444",<br>
>            focuscallback: function(e){},<br>
>            callback : function(){}<br>
>        });<br>
<br>

### set data:
> $("#objectid").pxautocomplete("set", { val: '16', image: 'http://127.0.0.1:8000/images/logo.png', text: 'Bursa' });<br>

### view:
#### 1.
![alt text](https://raw.githubusercontent.com/PiriAykut/px-autocomplete/master/screenshots/Screenshot_1.png)

<br>

#### 2.
![alt text](https://raw.githubusercontent.com/PiriAykut/px-autocomplete/master/screenshots/Screenshot_2.png)

<br>

#### 3.
![alt text](https://raw.githubusercontent.com/PiriAykut/px-autocomplete/master/screenshots/Screenshot_3.png)

