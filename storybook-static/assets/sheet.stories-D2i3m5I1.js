import{t as e}from"./jsx-runtime-BcgbbpDw.js";import{t}from"./button-Dcksmb_u.js";import{a as n,i as r,n as i,o as a,r as o,s,t as c}from"./sheet-B1ubtpfA.js";var l=e(),u={title:`UI/Sheet`,component:c,tags:[`autodocs`],argTypes:{side:{control:`select`,options:[`top`,`right`,`bottom`,`left`]}}},d={render:()=>(0,l.jsxs)(c,{children:[(0,l.jsx)(s,{asChild:!0,children:(0,l.jsx)(t,{variant:`outline`,children:`Open Sheet`})}),(0,l.jsxs)(i,{side:`right`,children:[(0,l.jsxs)(n,{children:[(0,l.jsx)(a,{children:`Edit Profile`}),(0,l.jsx)(o,{children:`Make changes to your profile here. Click save when done.`})]}),(0,l.jsx)(`div`,{className:`py-4 text-sm text-muted-foreground`,children:`Sheet content`}),(0,l.jsx)(r,{children:(0,l.jsx)(t,{children:`Save Changes`})})]})]})};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Sheet>\r
      <SheetTrigger asChild>\r
        <Button variant="outline">Open Sheet</Button>\r
      </SheetTrigger>\r
      <SheetContent side="right">\r
        <SheetHeader>\r
          <SheetTitle>Edit Profile</SheetTitle>\r
          <SheetDescription>\r
            Make changes to your profile here. Click save when done.\r
          </SheetDescription>\r
        </SheetHeader>\r
        <div className="py-4 text-sm text-muted-foreground">Sheet content</div>\r
        <SheetFooter>\r
          <Button>Save Changes</Button>\r
        </SheetFooter>\r
      </SheetContent>\r
    </Sheet>
}`,...d.parameters?.docs?.source}}};var f=[`Right`];export{d as Right,f as __namedExportsOrder,u as default};