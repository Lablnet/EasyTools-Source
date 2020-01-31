function editTodo(){var id=$("#editId").val(); var title=$("#title").val(); if (validateInput(id)==true && validateInput(title)==true){database.transaction(function(tx){tx.executeSql('UPDATE tasks SET text=? WHERE id=?', [title,id]);}); redirect('todos.html');}else{M.toast({html: 'All fields are required'});}}function addTodo(){var text=document.getElementById("addTodoTitle"); if (validateInput(text.value)==true){var todo={"id": new Date().getTime(), "isChecked": 'false', "text": text.value}; database.transaction(function(tx){tx.executeSql('INSERT INTO tasks (id, isChecked,text) values (?,? ,?)', [todo.id, todo.isChecked ,todo.text]);}); todo.value=""; text.value=''; redirect('todos.html');}else{M.toast({html: 'All fields are required'});}}function upateIsChecked(id, isChecked){database.transaction(function(tx){tx.executeSql('UPDATE tasks SET isChecked=? WHERE id=?', [isChecked,id]);}); redirect('todos.html');}function deleteTodo(id){database.transaction(function(tx){tx.executeSql('DELETE FROM tasks WHERE id=?', [id]);}); redirect('todos.html');}function showAllTodos(){removeChilds('ourTodos'); database.transaction(function(tx){tx.executeSql('SELECT * FROM tasks Order by id desc', [], function (tx, results){var len=results.rows.length; for (var i=0; i < len; i++){var id=results.rows.item(i).id; var title=results.rows.item(i).text; var isChecked=results.rows.item(i).isChecked; console.log(isChecked); var li=document.createElement('li'); li.setAttribute('class', 'collection-item card-panel hoverable'); if (isChecked=='false'){li.innerHTML='<b><i>' + timeSince(id) + '</i></b> <br>'+title+' <br><label></label>';}else{li.innerHTML='<b><i>' + timeSince(id) + '</i></b> <br><span class="strikethrough">'+title+'</span> <br><label></label>';}li.setAttribute('data-key', 'todosBtnsModel'+id); li.addEventListener('click', function(){openNoteModel(this.getAttribute('data-key'));}); var edit=document.createElement("a"); edit.innerHTML=' Edit'; edit.setAttribute('class', ''); edit.setAttribute('data-key', id); edit.setAttribute('data-val', title); edit.addEventListener("click", function(){localStorage.setItem('id', this.getAttribute('data-key')); localStorage.setItem('title', this.getAttribute('data-val')); redirect('edit_todo.html');}, false); var check=document.createElement("a"); if (isChecked=='false'){check.innerHTML=' check';}else{check.innerHTML=' Unchecked';}check.setAttribute('class', ''); check.setAttribute('data-key', id); check.setAttribute('check', isChecked); check.addEventListener("click", function(){if (this.getAttribute('check')=='false'){upateIsChecked(this.getAttribute('data-key'), 'true');}else{upateIsChecked(this.getAttribute('data-key'), 'false');}}, false); var del=document.createElement("a"); del.innerHTML=' Delete'; del.setAttribute('class', ''); del.setAttribute('style', 'border: 0px; color: red'); del.setAttribute('data-key', id); del.setAttribute('data-val', title); del.addEventListener("click", function(){localStorage.setItem('id', this.getAttribute('data-key')); redirect('delete_todo.html');}, false); var model=document.createElement('div'); model.setAttribute('id', 'todosBtnsModel'+id); model.setAttribute('class', 'modal bottom-sheet'); var modelChildMain=document.createElement('div'); modelChildMain.setAttribute('class', 'modal-content'); var modelChildChild=document.createElement('div'); modelChildChild.setAttribute('id', 'notesBtns'); modelChildChild.appendChild(check); modelChildChild.appendChild(edit); modelChildChild.appendChild(del); modelChildMain.appendChild(modelChildChild); model.appendChild(modelChildMain); var modelChildFooter=document.createElement('div'); modelChildFooter.setAttribute('class', 'modal-footer'); modelChildFooter.innerHTML='<a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>'; model.appendChild(modelChildFooter); document.body.appendChild(model); document.getElementById("ourTodos").appendChild(li);}});});}