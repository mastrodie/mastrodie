import os
path="music/"
list = []
n=0
print("[",end="")
for file in os.listdir(path):
    print("""            <button id=n"""+str(n)+""" class=songs onclick="songSelect('"""+file+"""\b\b\b\b')" draggable="true" ondragstart="startDrag(event)" ondragend="dragInterrupted()">"""+file+"""\b\b\b\b</button><br>""")
    n+=1
    list.append(file.replace("music/","",0))
print(list)
#    print("'"+file+"\b\b\b\b', ",end="")
#print("]")
input()