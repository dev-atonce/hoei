"use client";
import {
  BsTable,
  BsEraser,
  BsTypeBold,
  BsLink45Deg,
  BsTypeItalic,
  BsArrowDownUp,
  BsTypeUnderline,
  BsTypeStrikethrough,
} from "react-icons/bs";
import {
  RiHeading2,
  RiFontColor,
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiAlignJustify,
  RiListOrdered2,
  RiListUnordered,
  RiIndentDecrease,
  RiIndentIncrease,
  RiFullscreenFill,
} from "react-icons/ri";
import {
  RxCaretDown,
  RxFontSize,
  RxLineHeight,
  RxDividerHorizontal,
} from "react-icons/rx";
import { CgUndo, CgRedo } from "react-icons/cg";
import { useEffect, useState, useRef } from "react";
import ModalDialog from "../main/Modal";
import ImageModal from "../main/Modal/ImageModal";
import SourceCodeModal from "../main/Modal/SourceCodeModal";
import { Button } from "@nextui-org/react";
import { HexColorPicker,HexColorInput } from "react-colorful";
import "./editor.scss";

const minHeight = "25rem";
const HoverSelect = (el: any) => {
  const current = el.target;
  const rowElement = current.parentNode;
  const parentNode = rowElement.parentNode;
  // const index = parseInt(current.getAttribute('data-index'));
  let x = 0;
  let y = 0;

  parentNode.childNodes.forEach((row: any, i: any) => {
    y = i;
    Array.from(row.children).map((col: any, j: any) => {
      x = j;
      if (current == col) {
        parentNode.childNodes.forEach((v: any, k: any) => {
          Array.from(v.children).map((vc: any, l: any) => {
            if (k <= y && l <= x) (vc as any).classList.add("bg-slate-300");
            else (vc as any).classList.remove("bg-slate-300");
          });
        });
        parentNode.querySelector(".x").innerHTML = x + 1;
        parentNode.querySelector(".y").innerHTML = y + 1;
        return false;
      }
    });
  });
};
// Create a box to select the table. (column x row)
const TableList = ({ tableVisible,setTableVisible, btn }: any) => {
  let index = 0;
  return <div
    className={`${tableVisible==false?`hidden `:``}absolute rounded bg-white border border-slate-200 p-2 z-20`}
    style={{ left:0, top: "0", marginTop: "30px", width: "max-content" }}
  >
      {Array.from(Array(10).keys()).map((v: any, i: any) => (
        <div className="grid grid-cols-10 gap-1 mb-1" key={i}>
          {Array.from(Array(10).keys()).map((vs: any, j: any) => {
            if (j > 0) index++;
            //@ts-ignore
            return (
              <div
                key={index}
                className="border border-slate-200 w-4 h-4"
                data-index={index}
                onMouseOver={HoverSelect}
                onClick={(el) => {
                  CreateTable(el);
                  setTableVisible(false);
                }}
                //   @ts-ignore
                btn={btn}
              ></div>
            );
          })}
        </div>
      ))}
      <div className="w-full flex justify-center mt-2">
        <span className="mr-2 x">1</span> x <span className="ml-2 y">1</span>
      </div>
</div>
};

// Create table in to text content
const CreateTable = (el: any) => {
  const current = el.currentTarget;
  const parentNode = current.parentNode.parentNode;
  const x = parentNode.querySelector(".x").innerHTML;
  const y = parentNode.querySelector(".y").innerHTML;
  const TextEditor = parentNode.closest(".text-editor");
  const colWidth = 100 / x;
  const table = document.createElement("table");
  table.setAttribute("class", "border-collapse border border-slate-200 w-full");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  // thead
  let tr = document.createElement("tr");
  Array.from({ length: x }).map(() => {
    let th = document.createElement("th");
    th.setAttribute("width", `${colWidth}%`);
    th.setAttribute("class", "border border-slate-200 h-10");
    tr.append(th);
  });
  thead.append(tr);
  // tbody
  Array.from({ length: y - 1 }).map(() => {
    let tr = document.createElement("tr");
    Array.from({ length: x }).map(() => {
      let td = document.createElement("td");
      td.setAttribute("class", "border border-slate-200 h-10 p-1");
      tr.append(td);
    });
    tbody.append(tr);
  });
  //
  table.append(thead, tbody);
  TextEditor.querySelector(".txt-remark").append(table);
};


//================= Begin: Main Component =================//
const TextEditor = ({ key, id, dataId, state, setState, prop, placeholder, editor}: any) => 
{

  const EditorId = id ? id : new Date().getTime();
  const [allImages, setAllImages] = useState<any>([]);
  const [selectedImage, setSelectedImage] = useState<any>('');  
  const [visible, setVisible] = useState<Boolean>(false);
  const [imgVisible, setImgVisible] = useState<Boolean>(false);
  const [codeVisible, setCodeVisible] = useState<Boolean>(false);
  const [row, setRow] = useState<any>();
  const [imgSelect, setImgSelect] = useState<any>([]);
  const [imgCount, setImgCount] = useState<any>(0);
  const [imgTab, setImgTab] = useState<String>("current");
  const [preview, setPreview] = useState<any>('');
  const [alt, setAlt] = useState<any>('');
  const [width, setWidth] = useState<any>('');
  const [height, setHeight] = useState<any>('');
  const [className, setClassName] = useState<any>('');
  const [title, setTitle] = useState<any>('');
  const [sourceCode, setSourceCode] = useState<any>('');
  const [fcVisible, setFcVisible] = useState<Boolean>(false);
  const [ulVisible, setUlVisible] = useState<Boolean>(false);
  const [olVisible, setOlVisible] = useState<Boolean>(false);
  const [fontSizeVisible, setFontSizeVisible] = useState<any>(false);
  const [headingVisible, setHeadingVisible] = useState<Boolean>(false);
  const [lineHeight, setLineHeight] = useState<any>(false);
  const [tableVisible, setTableVisible] = useState<any>(false);
  const [HTML , setHTML] = useState<any>('');
  const [sortActive, setSortActive] = useState<Boolean>(false);
  const [color, setColor] = useState("#000000");

  const editorRef = useRef<any>(null);

  // const { onOpen, onOpenChange} = useDisclosure();

  const handler = () => setVisible(true);
  const closeHandler = () => setVisible(false);
  const closeImgHandler = () => setImgVisible(false);
  const closeCodeHandler = () => setCodeVisible(false);

  const getAllImages = async () => {
    const request = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/webpanel/media/${editor.images.getPath}`,{
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    const response = await request.json();
    if(response) setAllImages(response.data);
  }
  const resetSelectedImage = (e:any) => {
    setSelectedImage('');
    e.currentTarget.closest('.modal-content').querySelector('input[type="file"]').value = null;
  }

  const setCodeStateHandler = () => {
    const editorBody = document.getElementById(EditorId);
    if(editorBody?.querySelector('.editor-body'))
    {
      let makeElement = document.createElement('div');
      //@ts-ignore
      makeElement.innerHTML = editorBody.querySelector('.editor-body').innerHTML;
      makeElement.querySelectorAll('.row-panel').forEach((el:any)=>el.remove());
      makeElement.querySelectorAll('[contenteditable="true"]').forEach((el:any)=>el.removeAttribute('contenteditable'));
      makeElement.querySelectorAll('[draggable="true"]').forEach((el:any)=>{
        el.removeAttribute('draggable');
        if(sortActive==true){
          el.classList.remove('on-drag');
        }
      });
      let newString = makeElement.innerHTML;
      setState(newString,prop);
    }
  }
  const setSubState = () => {
    if(HTML=='') { 
      setHTML(state && state[prop]); 
      fetchSubState();
    }
  }
  const fetchSubState = () => {
    const textareaEl:any = document.querySelector(`textarea[name="${prop}"]`);
    if(textareaEl.value)
    {
      const editorBody:any = document.getElementById(EditorId)?.querySelector('.editor-body');
      const makeElement = document.createElement('div');
      //
      makeElement.innerHTML = textareaEl.value;
      makeElement.querySelectorAll('.grid')?.forEach((row:any)=>{
        const controlElement = document.createElement("div");
        controlElement.setAttribute(
          "class",
          "absolute bg-slate-300 row-panel right-0 top-0 overflow-hidden rounded-lg z-30"
        );
        controlElement.innerHTML = `
            <button class="rounded px-2 py-1 text-slate-800 hover:bg-slate-300 source-code" title="Soure code">
            <svg xmlns="http://www.w3.org/2000/svg" class="feather feather-code" fill="none" height="15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="15"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </button>
        `;
        const removeBtn = document.createElement("button");
        removeBtn.setAttribute("title", "Remove row");
        removeBtn.setAttribute(
          "class",
          "rounded px-2 py-1 text-slate-800 hover:bg-red hover:text-slate-100 remove-row"
        );
        removeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 15 15" height="15px" id="Layer_1" version="1.0" viewBox="0 0 512 512" width="15px" xml:space="preserve"><polygon points="445.2,109.2 402.8,66.8 256,213.6 109.2,66.8 66.8,109.2 213.6,256 66.8,402.8 109.2,445.2 256,298.4 402.8,445.2   445.2,402.8 298.4,256 "/></svg>`;
        controlElement.append(removeBtn)
        row.prepend(controlElement);
        row.querySelectorAll('[data-image="true"]').forEach((el:any)=> el.click = imgRemark);
        row.querySelectorAll('[data-text="text"]')?.forEach((el:any)=>{
          el.setAttribute('contenteditable', 'true');
        });
      })
      editorBody.innerHTML = makeElement.innerHTML;
      
    }
  }
//=====================================================//
//================= begin: Image Modal =================//
  const imgModal = (e: any) => {
    e.preventDefault();
    setImgVisible(true);
    // console.log(e.target.closest('.col-image'))
    let col = e.target.closest('.col-image');
    const img = col.querySelector('img');
    const title = col.querySelector('.img-title');
    if (img) {
      if(img.getAttribute('alt')) setAlt(img.getAttribute('alt')); else setAlt('');
      if(img.getAttribute('width')) setWidth(img.getAttribute('width')); else setWidth('');
      if(img.getAttribute('height')) setHeight(img.getAttribute('height')); else setHeight('');
      if(img.getAttribute('class')) setClassName(img.getAttribute('class')); else setClassName('');
      if(title) setTitle(title.innerText); else setTitle('');
      if(img.getAttribute('src')) setPreview(img.getAttribute('src')); else setPreview('');
    } else {
      setUnselect()
    }
  };
  const setUnselect = () => {
    setAlt('');setWidth('');setHeight('');setClassName('');setTitle('');setPreview('');
  };


  //================= begin: Select Modal =================//
  const handleSetSelect = (e: any) => {
    const current = e.target.closest(".grid");
    let selectRow = e.target.closest(".bg-stripes-pink").querySelectorAll(".select-row");
    let selectedRow:any = [];
    let count = selectRow ? selectRow.length : 0;
    let remove = 0;
    let action;
    if(current.classList.contains("select-row"))
    {
      action = 'decrement';
      remove = current.getAttribute('data-select');
      current.removeAttribute('data-select');
      current.classList.remove("select-row");
      current.querySelector('.count').remove();
    }else{
      count++;
      action = 'increment';
      current.classList.add("select-row");
      current.setAttribute("data-select", count);
      let countEl = document.createElement('div');
        countEl.setAttribute('class','absolute p-2 bg-indigo-500 rounded-xl w-7 h-7 text-white count text-sm flex justify-center items-center -mt-3 ml-2');
        countEl.innerText = `${count}`;
        current.append(countEl);
    }
    
    if(remove>0){
      let selectRow = e.target.closest(".bg-stripes-pink").querySelectorAll(".select-row");
      Array.from(selectRow).map((el:any,k:any)=>{
        if((k+1)>=remove){
          el.setAttribute('data-select',(k+1));
          el.querySelector('.count').innerHTML = (k+1);
        }
      });
    }
    Array.from(e.target.closest(".bg-stripes-pink").querySelectorAll(".select-row")).map((v,k)=>{
      //@ts-ignore
      if(v.getAttribute("data-content")) {
        //@ts-ignore
        selectedRow[v.getAttribute("data-select")] = JSON.parse(v.getAttribute("data-content"));
      }
    })
    setRow(selectedRow);
  };
  // select image
  const Select = (el: any) => {
    const current = el.currentTarget;
    if (current.classList.contains("image-select")) {
      current.classList.remove("image-select");
      imgSelect.map((v: any, k: Number) => {
        if (v == current.querySelector("img").getAttribute("src")) {
          imgSelect.splice(k, 1);
        }
      });
      setImgCount(imgCount - 1);
    } else {
      current.classList.add("image-select");
      imgSelect.push(current.querySelector("img").getAttribute("src"));
      setImgCount(imgCount + 1);
    }
    setImgSelect(imgSelect);
  };
  const imgUnselect = () => {
    setImgSelect([]);
    document.querySelectorAll(".image-select").forEach((v: any) => {
      v.classList.remove("image-select");
    });
  };
  const imgRemark = (e: any) => {
    document.querySelector(".img-remark")?.classList.remove("img-remark");
    if (e) e.closest('.col-image').classList.add("img-remark");
  };
  const textRemark = (e: any) => {
    document.querySelector(".txt-remark")?.classList.remove("txt-remark");
    if (e?.target) {
      e.target.classList.add("txt-remark");
      e.target.focus();
      e.preventDefault();
    }
  };
  const previewImg = (e:any) => {
    const input = e.currentTarget;
    const value = input.value;
    setPreview(value)
  }
  const copyToSelect = () => {
    setImgTab('current');
    imgSelect.map((v: any) => { setPreview(v) });
  }
  const insertImg = (el:any) => 
  {
    const preview = el.currentTarget.closest('.modal-content').querySelector('.preview');
    const remark = document.querySelector(".img-remark")
    if (remark) {
        remark.querySelectorAll("img")?.forEach((v) => { v.remove() });
        let img = document.createElement("img");
        img.setAttribute("src", preview.src);
        if(alt) img.setAttribute("alt", alt);
        if(width) img.setAttribute("width", width);
        if(height) img.setAttribute("height", height);
        if(className) img.setAttribute("class", className);
        if(title) {
            remark.classList.remove(...['flex','justify-center','items-center']);
            remark.querySelector(".img-title")?.remove();
            const newNode = document.createElement("div");
            newNode.classList.add("img-title","text-center");
            newNode.innerText = title;
            remark.append(img,newNode);
        }else{
          remark.append(img);
        }
        closeImgHandler();
        remark.classList.remove("img-remark");
        setImgSelect([]);
        setPreview('');
    }
  };
  //================= end: Select Modal =================//

  const createRow = () => {
    if (row) 
    {
      let editor:any = document.getElementById(EditorId);
      let editorBody:any = editor?.querySelector(".editor-body");
      
      row.map((row: any, k: any) => 
      {
        if(k > 0)
        {
          let rowElement = document.createElement("div");
          rowElement.setAttribute(
            "class",
            "grid grid-cols-1 md:grid-cols-12 gap-4 relative pt-6 pb-4 drag-sort-enable"
          );
          // rowElement.setAttribute("draggable","true");
          const controlBox = document.createElement("div");
          controlBox.setAttribute(
            "class",
            "absolute bg-slate-300 row-panel right-0 top-0 overflow-hidden rounded-lg z-30"
          );
          controlBox.innerHTML = `
              <button class="rounded px-2 py-1 text-slate-800 hover:bg-slate-300 source-code" title="Soure code">
              <svg xmlns="http://www.w3.org/2000/svg" class="feather feather-code" fill="none" height="15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="15"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </button>
          `;
         
          const removeBtn = document.createElement("button");
          removeBtn.setAttribute("title", "Remove row");
          removeBtn.setAttribute(
            "class",
            "rounded px-2 py-1 text-slate-800 hover:bg-red hover:text-slate-100 remove-row"
          );
          removeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 15 15" height="15px" id="Layer_1" version="1.0" viewBox="0 0 512 512" width="15px" xml:space="preserve"><polygon points="445.2,109.2 402.8,66.8 256,213.6 109.2,66.8 66.8,109.2 213.6,256 66.8,402.8 109.2,445.2 256,298.4 402.8,445.2   445.2,402.8 298.4,256 "/></svg>`;
          controlBox.append(removeBtn);
          rowElement.append(controlBox);

          Array.from(row).map((v:any) =>
          {
            let column = document.createElement("div");
            column.setAttribute("class", v.col);
            if (v.content == "text") {
              column.setAttribute("contenteditable", "true");
              column.setAttribute("data-text", "text");
              column.classList.add("col-text");
            }
            if (v.content == "image") {
              column.classList.add("col-image","flex","justify-center","items-center","cursor-pointer");
              column.setAttribute("data-image", "true");
              column.setAttribute("data-text", "image");
            }
            rowElement.append(column);
          });
          editorBody.append(rowElement);
        }
      })
      setCodeStateHandler();
    }
  };
  const deleteRow = (e: any) => {
    e.closest(".grid").remove();
    setCodeStateHandler();
  };

  const SourceCode = (el:any) => 
  { 
    document.querySelector('.code-remark')?.classList.remove('code-remark');
    const row = el.closest('.grid-cols-1');
    row.classList.add('code-remark');
    let newString:any = '';
    Array.from(row.children).map((v:any, k:any) => {
      if(k>0) newString += v.outerHTML;
    })
    setSourceCode(newString);
    setCodeVisible(true);
  }
  const saveSourceCode = (el:any) => {
    const stringCode = el.closest('.modal-content').querySelector('textarea').value;
    const remark:any = document.querySelector('.code-remark');
    var dom = new DOMParser().parseFromString(stringCode,"text/html");
    Array.from(remark?.children).map((v:any,k:any)=>{ if (k > 0) v.remove(); });
    //@ts-ignore
    Array.from(dom.querySelector('body')?.children).map((v:any)=>{ remark.append(v) });
    setCodeVisible(false);
    setSourceCode('');
  }
  
  const upload = async (e:any) => 
  {
    const setSelectedImage = document.querySelector('.modal-content')?.querySelectorAll('img');
    if(setSelectedImage){
      let formData = new FormData();
      let files = e.currentTarget.closest('.modal-content').querySelector('[type="file"]').files;
      let uploadAmount = files?.length;
      if (files.length>0)
      {
        for (let i = 0; i < files?.length; i++) {
            if (i < uploadAmount) formData.append("image", files?.[i]);
        }
        const request = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/webpanel/media/${editor.images.uploadPath}`, {
            method: 'POST',
            headers: {
              authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: formData,
        });   
        const response = await request.json();
        if(uploadAmount == response.image.length){

          setImgTab('select')
          // alert("Images uploaded successfully");
          Array.from(setSelectedImage).map((el:any)=>el.remove());
          //@ts-ignore
          document.querySelector('.modal-content').querySelector('input[type="file"]').value = null;
          getAllImages();

        }else{
          alert("Some images not uploaded");
        }

      }
    }
  }
  const removeImage = async (e:any) => 
  {
    if(confirm("Are you sure you want to remove this image?") === true)
    {
      let setSelectedImage = e.currentTarget.closest('.modal-content')?.querySelectorAll('.image-select');
      let removeAmount = setSelectedImage?.length ?? 0;
      let imagePath: any = [];
      if (removeAmount > 0) {
          for (let i = 0; i < removeAmount; i++) {
              // @ts-ignore
              imagePath.push(setSelectedImage[i].querySelector('img').src);
          }
          const request = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/webpanel/media`, {
              method: 'DELETE',
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify({"imagePath":imagePath})
          });
          if (!request.ok) {
              alert(`${request.status} ${request.statusText}`);
          } else {
            const response = await request.json();
            if (response.status == "success") {
              setSelectedImage?.forEach((c:any)=>c.remove());
            } else {
              alert(`${response.status} ${response.message}`);
            }
          }
             
      }
    }
  }
//================= end: Image Modal =================//
//=====================================================//

//================= begin: Exec Command ==================//
  // 3. Text bold
  const TextBold = () => {
    document.getSelection();
    document.execCommand("bold", false, undefined);
  };
  // 4. Text italic
  const TextItalic = () => {
    document.getSelection();
    document.execCommand("italic", false, undefined);
  };
  // 6. font color
  const setColorHandler = (color:any) => 
  {
    let setlection:any = document.getSelection();
    let last:any = null;
    for (var i = 0; i < setlection.rangeCount; i++)
    {
      let nodes:any = getNodesInRange(setlection.getRangeAt(i));
      last = nodes[nodes.length - 2];
    }
    try{
      setColor(color);
      //@ts-ignore
      document.execCommand('styleWithCSS', false, true);
      document.execCommand('foreColor', false, color);
      try{last.style.color = color;}catch(e:any){console.log(e.message)}
    }catch(e:any){
      console.log(e.message)
    }
  }
  // 7.
  const ClearFormat = () => {
    let setlection:any = document.getSelection();
    for (var i = 0; i < setlection.rangeCount; i++) 
    {
      let nodes:any = getNodesInRange(setlection.getRangeAt(i));
      Array.from(nodes).map((el:any, k:any)=>{
        try {
          el.removeAttribute('style');
        } catch(e:any){
          console.log(e.message)
        }
      })
    }
  }
  // 10. Under Order List (ul)
  const UnderOrderList = (style:any) => {
    let selection = document.getSelection();
    document.execCommand('insertHTML', false, `<ul class="${style} ml-6"><li>${selection}</li></ul>`);
    setTimeout(()=>{
      setUlVisible(false);
    },100);
    
  }
  // 11. Order List (ol)
  const OrderList = (style:any) => {
    let selection = document.getSelection();
    document.execCommand('insertHTML', false, `<ol class="${style} ml-6"><li>${selection}</li></ol>`);
    setTimeout(()=>{
      setUlVisible(false);
    },100);
    
  }
  // 14. Font size
  const FontSize = (size:any) => {
    let selection = document.getSelection();
      document.execCommand("insertHTML", false, `<p style="font-size:${size}; line-height:normal">${selection}</p>`);
  }
  // 15.
  const Heading = (select: String) => {
    let selection = document.getSelection();
    let className = '';
    switch (select) {
        case 'h1': className = 'text-4xl font-bold mb-3'; break;
        case 'h2': className = 'text-3xl font-bold mb-3'; break;
        case 'h3': className = 'text-2xl font-bold mb-3'; break;
        case 'h4': className = 'text-xl font-bold mb-3'; break;
        case 'h5': className = 'text-lg font-bold mb-3'; break;
        case 'h6': className = 'text-base font-bold mb-3'; break;
        case 'code': className = 'text-sm text-slate-500 dark:text-slate-400 whitespace-pre'; break;
        default: break;
    }
    let html= '';
    if(select == 'code'){
      html = `<pre class="p-2 bg-slate-50 rounded-lg"><${select}${className?` class="${className}"`:``}>${selection}</${select}></pre>`;
    }else{
      html = `<${select}${className?` class="${className}"`:``}>${selection}</${select}>`;
    }
    document.execCommand("insertHTML", false, html);
  };
  // 16.
  const LineHeight = (height:any) => {
      let setlection:any = document.getSelection();
      for (var i = 0; i < setlection.rangeCount; i++) 
      {
        let nodes:any = getNodesInRange(setlection.getRangeAt(i));
        Array.from(nodes).map((el:any, k:any)=>{
          if (k == 0) {
            try {
              el.style.lineHeight = height;
            } catch(e:any){
              console.log(e.message)
            }
          }
        })    
      }
  }
  // 17.
  const HorizontalLine = () => {
    document.getSelection();
    document.execCommand('insertHTML',false,'<hr class="mt-2 mb-2"></hr>');
  }
  // 21. insert link
  function addLink() {
      var linkURL = prompt('Enter a URL:', 'http://');
      var sText = document.getSelection();
      document.execCommand('insertHTML', false, '<a class="link" href="' + linkURL + '" target="_blank">' + sText + '</a>');
  }
  // 22. Full screen
  const fullScreenMode = () => document.getElementById(EditorId)?.classList.toggle('full-screen-mode');
  //================= end: Exec Command ==================//
  //======================================================//

  const sortHandler = (e:any) => {
    setSortActive(!sortActive);
    e.target.closest('.tools-item')?.classList.toggle('active');
    const editor:any = document.getElementById(EditorId);
    editor.querySelectorAll('.drag-sort-enable').forEach((el:any) => {
      el.classList.toggle('on-drag');
      el.querySelector('.remove-row')?.classList.toggle('hidden');
      el.querySelector('.source-code')?.classList.toggle('hidden');
      let edit = (!sortActive)? false: true;
      el.querySelector('[contenteditable]')?.setAttribute('contenteditable',edit);
    });
    enableDragSort('drag-sort-enable');
  }

  const enableDragSort = (listClass:any) =>
  {
    const sortableLists:any = document.getElementsByClassName(listClass);
    if(!sortActive){
      Array.prototype.map.call(sortableLists, (list) => enableDragList(list));
    }else{
      Array.prototype.map.call(sortableLists, (list) => list.removeAttribute('draggable'));
    }
  }
  // const enableDragList = (list:any) => Array.prototype.map.call(list.children, (item) => {enableDragItem(item)});
  const enableDragList = (list:any) => {enableDragItem(list)};
  const enableDragItem = (item:any) =>
  {
    item.setAttribute('draggable', true);
    item.ondrag = OnDrag;
    item.ondragend = HandleDrop;
  }
  const OnDrag = (item:any) =>
  {
    const selectedItem = item.target.closest('.grid'),
          list = selectedItem.parentNode,
          //@ts-ignore
          x = event.clientX, y = event.clientY;

    selectedItem.classList.add('focus');
    let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
    
    if (list === swapItem.parentNode) {
      swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
      list.insertBefore(selectedItem, swapItem);
    }
  }
  const HandleDrop = (item:any) => item.target.closest('.grid').classList.remove('focus');
  //@ts-ignore
  const getNextNode = ({node, skipChildren, endNode}:any) =>
  {
    //if there are child nodes and we didn't come from a child node
    if (endNode == node) return null;
    if (node.firstChild && !skipChildren) return node.firstChild;
    if (!node.parentNode) return null;
    //@ts-ignore
    return node.nextSibling || getNextNode(node.parentNode, true, endNode); 
  };
  const getNodesInRange = (range:any) =>
  {
      var start = range.startContainer;
      var end = range.endContainer;
      var commonAncestor = range.commonAncestorContainer;
      var nodes = [];
      var node;
      // walk parent nodes from start to common ancestor
      for (node = start.parentNode; node; node = node.parentNode)
      {
          nodes.push(node);
          if (node == commonAncestor) break;
      }
      nodes.reverse();
      // walk children and siblings from start until end is found
      for (node = start; node; node = getNextNode(node))
      {
          nodes.push(node);
          if (node == end) break;
      }
      return nodes;
  }
  const removeRemark = () => {
    let Editor = document.getElementById(EditorId);
    Editor?.querySelectorAll('.txt-remark').forEach((el:any) => el.remove());
    Editor?.querySelectorAll('.img-remark').forEach((el:any) => el.remove());
    Editor?.querySelectorAll('.focused').forEach((el:any) => el.remove());
  }
  const removeTableRemark = () => {
    let Editor:any = document.getElementById(EditorId);
    Editor?.querySelectorAll('.focused').forEach((el:any) => el.remove());

  }
  const removeTable = () => {
    
  }


  useEffect(()=>{

    document.addEventListener("click", (e) => {

        //@ts-ignore
        const txtRemark = e.target.closest(".txt-remark");
        if(!txtRemark){
          document.querySelector(".txt-remark")?.classList.remove("txt-remark");
        }
        //@ts-ignore
        const sourceCode = e.target.closest(".source-code");
        if(sourceCode){
          SourceCode(sourceCode);
        }
        //@ts-ignore
        const imageModal = e.target.closest('[data-image="true"]');
        if(imageModal){
          imgRemark(e.target)
          imgModal(e); 
        }
        //@ts-ignore
        const contentEditable = e.target.closest('[contenteditable="true"]');
        if(contentEditable){
          textRemark(e)   
        }    
        //@ts-ignore
        const removeRowBtn = e.target.closest(".remove-row");
        if(removeRowBtn){
          deleteRow(removeRowBtn);
        }
        //@ts-ignore
        const thEl = e.target.closest('th');
        if(thEl){
          // console.log(thEl)
          document.querySelectorAll('th').forEach(el => el.classList.remove('focused'))
          document.querySelectorAll('td').forEach(el => el.classList.remove('focused'))
          thEl.classList.toggle('focused');
        }
         //@ts-ignore
        const tdEl = e.target.closest('td');
        if(tdEl){
          document.querySelectorAll('th').forEach(el => el.classList.remove('focused'))
          document.querySelectorAll('td').forEach(el => el.classList.remove('focused'))
          tdEl.classList.toggle('focused')
        }


      // console.log(thEl)

    });

    // getAllImages();

    if(prop && state[prop]) setSubState();
    editorRef.current = true;
    return () => {
      editorRef.current = false;
      document.removeEventListener("click",setCodeStateHandler);
    }
  },[state]);
  
  return (
    <div key={key}>
      <ModalDialog
        visible={visible}
        closeHandler={closeHandler}
        select={{ row, handleSetSelect, createRow, EditorId }}
        title="Add Row"
      />
      <ImageModal
        imgVisible={imgVisible}
        closeImgHandler={closeImgHandler}
        dataId={dataId}
        editor={editor}
        allImages={allImages}
        getAllImages={getAllImages}
        select={{
          Select,
          imgSelect,imgUnselect,
          imgCount,setImgCount,
          insertImg,
          imgTab,setImgTab,
          copyToSelect,
          preview,previewImg,
          alt,setAlt,
          width,setWidth,
          height,setHeight,
          className,setClassName,
          title,setTitle,
          upload,removeImage,
          selectedImage,resetSelectedImage,
          setSelectedImage,
        }}
        title="Image"
      />
      <SourceCodeModal
        codeVisible={codeVisible}
        sourceCode={sourceCode}
        setSourceCode={setSourceCode}
        closeCodeHandler={closeCodeHandler}
        saveSourceCode={saveSourceCode}
        title="Source Code"
      />
      <div
        id={EditorId}
        className="rounded-lg bg-white dark:border-strokedark dark:bg-boxdark h-full"
      >
        <textarea 
          className="hidden"
          name={prop}
          value={state && state[prop]}
          placeholder={placeholder}
        ></textarea>
        <div className="text-editor relative" onBlur={setCodeStateHandler}>
          <div className="header sticky z-999 top-17 border border-slate-300 bg-white">
            <div className="tools flex justify-stretch p-1">
              <div className="flex ">
                <div className="group flex border-r pr-1 border-slate-300">
                  <button
                    type="button"
                    title="Undo"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2"
                  >
                    <CgUndo onClick={() => document.execCommand("undo")} />
                  </button>
                  <button
                    type="button"
                    title="Undo"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2"
                  >
                    <CgRedo onClick={() => document.execCommand("redo")} />
                  </button>
                </div>
                <div className="group flex border-r px-1 border-slate-300">
                  <button
                    type="button"
                    title="Bold"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2"
                  >
                    <BsTypeBold onClick={TextBold} />
                  </button>
                  <button
                    type="button"
                    title="Italic"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2"
                  >
                    <BsTypeItalic onClick={TextItalic} />
                  </button>
                  <button
                    type="button"
                    title="Underline"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2"
                  >
                    <BsTypeUnderline
                      onClick={() => {
                        document.execCommand("underline");
                      }}
                    />
                  </button>
                  <button
                    type="button"
                    title="Underline"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2"
                  >
                    <BsTypeStrikethrough
                      onClick={() => {
                        document.execCommand("strikethrough");
                      }}
                    />
                  </button>
                  <div className="tool-item relative flex items-center border border-transparent hover:border hover:border-slate-200 cursor-pointer rounded">
                    <button
                      type="button"
                      title="Unordered"
                      className="tools-item hover:bg-slate-200 text-slate-500 hover:text-slate-900 p-2"
                      onClick={()=>setColorHandler(color)}
                      style={{color:color?color:"#000000"}}
                    >
                      <RiFontColor/>
                    </button>
                    <button
                        type="button"
                        id="dropdownDividerButton"
                        data-dropdown-toggle="dropdownDivider" 
                        title="Font Color"
                        className="pointer bg-white hover:bg-slate-200 max-h[32] flex items-center"
                        style={{ height: "32px" }}
                        onMouseOver={()=>setFcVisible(true)} onMouseOut={()=>setFcVisible(false)}
                      >
                        <RxCaretDown {...setColor}/>
                        <div 
                          id='dropdownDivider' 
                          aria-labelledby="dropdownDividerButton"
                          className={`absolute ${fcVisible==false?`hidden`:``} rounded bg-white border z-20 border-slate-200 text-left DropdownUnorderedList`}
                          style={{ left:"0", top: "0", marginTop: "30px", width: "max-content" }}
                        >

                          <div className="p-4 bg-white">
                            <HexColorPicker color={color} onChange={setColorHandler}/>
                            <HexColorInput color={color} onChange={setColorHandler} className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 mt-2 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                          </div>
                        </div>
                      </button>
                    </div>
                  <button
                    type="button"
                    title="Clear Formatting"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2"
                    onClick={ClearFormat}
                  >
                    <BsEraser />
                  </button>
                </div>
                <div className="group flex border-r px-1 border-slate-300">
                  <button
                    type="button"
                    title="Align left"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2"
                  >
                    <RiAlignLeft
                      onClick={() => {
                        document.execCommand("justifyLeft");
                      }}
                    />
                  </button>
                  <button
                    type="button"
                    title="Align center"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2"
                  >
                    <RiAlignCenter
                      onClick={() => {
                        document.execCommand("justifyCenter");
                      }}
                    />
                  </button>
                  <button
                    type="button"
                    title="Align right"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2"
                  >
                    <RiAlignRight
                      onClick={() => {
                        document.execCommand("justifyRight");
                      }}
                    />
                  </button>
                  
                  <button
                    type="button"
                    title="Align justify"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2"
                  >
                    <RiAlignJustify
                      onClick={() => document.execCommand("justifyFull")}
                    />
                  </button>
                </div>
                <div className="group flex border-r px-1 border-slate-300">
                  <div className="tool-item relative flex items-center border border-transparent hover:border hover:border-slate-200 cursor-pointer rounded">
                    <button
                      type="button"
                      title="Unordered"
                      className="tools-item hover:bg-slate-200 text-slate-500 hover:text-slate-900 p-2"
                      onClick={()=>{ UnderOrderList('list-disc'); }}
                    >
                      <RiListUnordered/>
                    </button>
                    <button
                      type="button"
                      id="dropdownDividerButton"
                      data-dropdown-toggle="dropdownDivider" 
                      title="Unordered"
                      className="pointer bg-white hover:bg-slate-200 max-h[32] flex items-center"
                      style={{ height: "32px" }}
                      onMouseOver={()=>setUlVisible(true)} onMouseOut={()=>setUlVisible(false)}
                    >
                      <RxCaretDown />
                      <div 
                        id='dropdownDivider' 
                        aria-labelledby="dropdownDividerButton"
                        className={`absolute ${ulVisible==false?`hidden`:``} rounded bg-white border z-20 border-slate-200 text-left DropdownUnorderedList`}
                        style={{ left:"0", top: "0", marginTop: "30px", width: "max-content" }}
                      >
                        <ul>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>{UnderOrderList('list-disc')}}>Default</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>{UnderOrderList('list-circle')}}>Circle</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>{UnderOrderList('list-square')}}>Square</button></li>
                        </ul>
                      </div>
                    </button>
                  </div>
                  <div className="tool-item relative flex items-center border border-transparent hover:border hover:border-slate-200 cursor-pointer rounded">
                    <button
                      type="button"
                      title="Ordered"
                      className="tools-item hover:bg-slate-200 text-slate-500 hover:text-slate-900 p-2"
                    >
                      <RiListOrdered2
                        onClick={() => {
                          document.execCommand("insertOrderedList");
                        }}
                      />
                    </button>
                    <button
                      title="Ordered"
                      className="pointer bg-white hover:bg-slate-200 max-h[32] flex items-center"
                      style={{ height: "32px" }}
                      onMouseOver={()=>setOlVisible(true)} onMouseOut={()=>setOlVisible(false)}
                    >
                      <RxCaretDown />
                      <div 
                        className={`absolute ${!olVisible?`hidden`:``} rounded bg-white border z-20 border-slate-200 text-left DropdownUnorderedList`}
                        style={{ left:"0", top: "0", marginTop: "30px", width: "max-content" }}
                      >
                        <ul>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>OrderList("list-decimal")}>Default</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>OrderList("list-[lower-alpha]")}>Lower Alpha</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>OrderList("list-[lower-greek]")}>Lower Greek</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>OrderList("list-[lower-roman]")}>Lower Roman</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>OrderList("list-[upper-alpha]")}>Upper Alpha</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>OrderList("list-[upper-roman]")}>Upper Roman</button></li>
                        </ul>
                      </div>
                    </button>
                  </div>
                  <button
                    type="button"
                    disabled={true}
                    title="Decrease Indent"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 disabled:opacity-75 disabled:bg-white disabled:text-slate-300 p-2"
                  >
                    <RiIndentDecrease
                      onClick={() => document.execCommand("outdent")}
                    />
                  </button>
                  <button
                    type="button"
                    title="Increase Indent"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2"
                  >
                    <RiIndentIncrease
                      onClick={() => {
                        document.execCommand("indent");
                      }}
                    />
                  </button>
                </div>
                <div className="group flex border-r px-1 border-slate-300">
                  <div className="tool-item relative flex items-center border border-transparent hover:border hover:border-slate-200 cursor-pointer rounded">
                    <button
                      type="button"
                      title="Font Size"
                      className="tools-item hover:bg-slate-200 text-slate-700 hover:text-slate-900 p-2"
                    >
                      <RxFontSize />
                    </button>
                    <button
                      type="button"
                      title="Font Size"
                      className="pointer bg-white hover:bg-slate-200 max-h[32] flex items-center"
                      style={{ height: "32px" }}
                      onMouseOver={()=>setFontSizeVisible(true)} onMouseOut={()=>setFontSizeVisible(false)}
                    >
                      <RxCaretDown />
                      <div
                        className={`absolute${fontSizeVisible==false?` hidden`:``} rounded bg-white border z-20 border-slate-200`}
                        style={{left:0,top:0,marginTop:"30px",width:"max-content",height:minHeight,overflowY:"auto",overflowX:"hidden"}}>
                        <ul>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>FontSize('8px')}>8px</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>FontSize("9px")}>9px</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>FontSize("10px")}>10px</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>FontSize("11px")}>11px</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>FontSize("12px")}>12px</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>FontSize("14px")}>14px</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>FontSize("16px")}>16px</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>FontSize("24px")}>24px</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>FontSize("30px")}>30px</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>FontSize("36px")}>36px</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>FontSize("48px")}>48px</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>FontSize("60px")}>60px</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>FontSize("72px")}>72px</button></li>
                          <li><button type="button" className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>FontSize("96px")}>96px</button></li>
                        </ul>
                      </div>
                    </button>
                  </div>
                  <div className="tool-item relative flex items-center border border-transparent hover:border hover:border-slate-200 cursor-pointer rounded">
                    <button
                      type="button"
                      title="Heading"
                      className="tools-item hover:bg-slate-200 text-slate-700 hover:text-slate-900 p-2"
                      onClick={()=>Heading("h1")}
                    >
                      <RiHeading2 />
                    </button>
                    <button
                      type="button"
                      title="Heading"
                      className="pointer bg-white hover:bg-slate-200 max-h[32] flex items-center"
                      style={{ height: "32px" }}
                      onMouseOver={()=>setHeadingVisible(true)} onMouseOut={()=>setHeadingVisible(false)}
                    >
                      <RxCaretDown />
                      <div>
                        <ul
                          className={`absolute${headingVisible==false?` hidden`:``} rounded text-left bg-white border z-20 border-slate-200 overflow-hidden`}
                          style={{left:0,  top: "0", marginTop: "30px", width: "max-content" }}
                        >
                          {/* {Array.from(fontSize).map((v)=>(<li className="px-4 py-1 text-[14px] hover:bg-slate-100" data-type={v}>Heading 1</li>))} */}
                          <li><button type="button" onClick={()=>Heading("p")} className="block px-4 py-1 text-[14px] hover:bg-slate-100">Paragraph</button></li>
                          <li><button type="button" onClick={()=>Heading("h1")} className="block px-4 py-1 text-[14px] hover:bg-slate-100">Heading 1</button></li>
                          <li><button type="button" onClick={()=>Heading("h2")} className="block px-4 py-1 text-[14px] hover:bg-slate-100">Heading 2</button></li>
                          <li><button type="button" onClick={()=>Heading("h3")} className="block px-4 py-1 text-[14px] hover:bg-slate-100">Heading 3</button></li>
                          <li><button type="button" onClick={()=>Heading("h4")} className="block px-4 py-1 text-[14px] hover:bg-slate-100">Heading 4</button></li>
                          <li><button type="button" onClick={()=>Heading("h5")} className="block px-4 py-1 text-[14px] hover:bg-slate-100">Heading 5</button></li>
                          <li><button type="button" onClick={()=>Heading("h6")} className="block px-4 py-1 text-[14px] hover:bg-slate-100">Heading 6</button></li>
                          <li><button type="button" onClick={()=>Heading("pre")} className="block px-4 py-1 text-[14px] hover:bg-slate-100">Pre</button></li>
                          <li><button type="button" onClick={()=>Heading("blockqoute")} className="block px-4 py-1 text-[14px] hover:bg-slate-100">Blockquote</button></li>
                          <li><button type="button" onClick={()=>Heading("code")} className="block px-4 py-1 text-[14px] hover:bg-slate-100">Code</button></li>
                        </ul>
                      </div>
                    </button>
                  </div>
                  <div className="tool-item relative flex items-center border border-transparent hover:border hover:border-slate-200 cursor-pointer rounded">
                    <button
                      type="button"
                      title="Heading"
                      className="tools-item hover:bg-slate-200 text-slate-700 hover:text-slate-900 p-2"
                    >
                      <RxLineHeight />
                    </button>
                    <button
                      type="button"
                      title="Heading"
                      className="pointer bg-white hover:bg-slate-200 max-h[32] flex items-center"
                      style={{ height: "32px" }}
                      onMouseOver={()=>setLineHeight(true)} onMouseOut={()=>setLineHeight(false)}
                    >
                      <RxCaretDown />
                      <div
                        className={`absolute${lineHeight==false?` hidden`:``} rounded bg-white border z-20 border-slate-200 text-left`}
                        style={{left:0, top: 0, marginTop: "30px", width: "max-content" }}
                      >
                        <ul>
                          <li><button className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>LineHeight('1')}>1</button></li>
                          <li><button className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>LineHeight('2')}>2</button></li>
                          <li><button className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>LineHeight("1.1")}>1.1</button></li>
                          <li><button className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>LineHeight("1.2")}>1.2</button></li>
                          <li><button className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>LineHeight("1.3")}>1.3</button></li>
                          <li><button className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>LineHeight("1.4")}>1.4</button></li>
                          <li><button className="block px-4 py-1 text-[14px] hover:bg-slate-100" onClick={()=>LineHeight("1.5")}>1.5</button></li>
                        </ul>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="group flex border-r px-1 border-slate-300">
                  <button
                    type="button"
                    title="Horizontal Line"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2"
                    onClick={HorizontalLine}
                  >
                    <RxDividerHorizontal />
                  </button>
                  <div className="tool-item relative flex items-center border border-transparent hover:border hover:border-slate-200 cursor-pointer rounded">
                    <button
                      type="button"
                      title="Heading"
                      className="tools-item hover:bg-slate-200 text-slate-700 hover:text-slate-900 p-2"
                    >
                      <BsTable />
                    </button>
                    <button
                      type="button"
                      title="Heading"
                      className="pointer bg-white hover:bg-slate-200 max-h[32] flex items-center"
                      style={{ height: "32px" }}
                      onMouseOver={()=>setTableVisible(true)} 
                      onMouseOut={()=>setTableVisible(false)}
                    >
                      <RxCaretDown />
                      <TableList tableVisible={tableVisible} setTableVisible={setTableVisible}/>
                    </button>
                  </div>
                  <button
                    type="button"
                    title="Insert Link"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2"
                    onClick={addLink}
                  >
                    <BsLink45Deg />
                  </button>
                </div>
                <button 
                  type="button" 
                  title="Sort" 
                  className={`tools-item${sortActive?` bg-slate-200`:` bg-white`} rounded  text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2 ml-1`}
                  onClick={sortHandler}
                >
                  <BsArrowDownUp />
                </button>
              </div>
              <div className="w-full"></div>
              <div className="flex-none">
                <div className="group flex">
                  <button
                    type="button"
                    title="Full Screen"
                    className="tools-item rounded bg-white text-slate-700 hover:bg-slate-200 hover:text-slate-900 p-2"
                    onClick={fullScreenMode}
                  >
                    <RiFullscreenFill />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="editor-body relative min-h-100 p-2 focus:outline-none focus-visible:outline-none border-l border-r border-slate-300"
            suppressContentEditableWarning={true}
            contentEditable={false}
            aria-disabled="false"
            tabIndex={-1}
            spellCheck="false"
            ref={editorRef}
            //@ts-ignore
            
          >
          </div>
          <div className="editor-footer border border-slate-300 p-2">
            <div id="output"></div>
            <Button
              onPress={handler}
              className="bg-slate-400 text-white text-xs hover:bg-slate-500 rounded-lg py-0 px-2 font-bold"
            >
              Add Row
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TextEditor;
