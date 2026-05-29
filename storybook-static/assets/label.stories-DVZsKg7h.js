import{t as e}from"./jsx-runtime-BcgbbpDw.js";import{t}from"./input-9QqpP4R0.js";import{t as n}from"./label-Bwxpmoiv.js";var r=e(),i={title:`UI/Label`,component:n,tags:[`autodocs`]},a={render:e=>(0,r.jsxs)(`div`,{className:`grid w-full max-w-sm gap-1.5`,children:[(0,r.jsx)(n,{htmlFor:`name`,...e,children:`Name`}),(0,r.jsx)(t,{id:`name`,placeholder:`Your name`})]})},o={render:e=>(0,r.jsxs)(`div`,{className:`grid w-full max-w-sm gap-1.5`,children:[(0,r.jsx)(n,{htmlFor:`disabled`,className:`peer-disabled:opacity-50`,...e,children:`Disabled Label`}),(0,r.jsx)(t,{id:`disabled`,disabled:!0,placeholder:`Disabled field`})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => <div className="grid w-full max-w-sm gap-1.5">\r
      <Label htmlFor="name" {...args}>Name</Label>\r
      <Input id="name" placeholder="Your name" />\r
    </div>
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <div className="grid w-full max-w-sm gap-1.5">\r
      <Label htmlFor="disabled" className="peer-disabled:opacity-50" {...args}>Disabled Label</Label>\r
      <Input id="disabled" disabled placeholder="Disabled field" />\r
    </div>
}`,...o.parameters?.docs?.source}}};var s=[`Default`,`Disabled`];export{a as Default,o as Disabled,s as __namedExportsOrder,i as default};