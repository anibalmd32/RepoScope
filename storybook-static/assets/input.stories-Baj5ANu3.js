import{t as e}from"./jsx-runtime-BcgbbpDw.js";import{t}from"./input-9QqpP4R0.js";import{t as n}from"./label-Bwxpmoiv.js";var r=e(),i={title:`UI/Input`,component:t,tags:[`autodocs`],argTypes:{type:{control:`text`},placeholder:{control:`text`},disabled:{control:`boolean`}}},a={args:{placeholder:`Type something...`}},o={render:e=>(0,r.jsxs)(`div`,{className:`grid w-full max-w-sm gap-1.5`,children:[(0,r.jsx)(n,{htmlFor:`email`,children:`Email`}),(0,r.jsx)(t,{id:`email`,type:`email`,placeholder:`name@example.com`,...e})]})},s={args:{disabled:!0,placeholder:`Disabled input`}},c={args:{type:`file`}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Type something...'
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <div className="grid w-full max-w-sm gap-1.5">\r
      <Label htmlFor="email">Email</Label>\r
      <Input id="email" type="email" placeholder="name@example.com" {...args} />\r
    </div>
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: 'Disabled input'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'file'
  }
}`,...c.parameters?.docs?.source}}};var l=[`Default`,`WithLabel`,`Disabled`,`File`];export{a as Default,s as Disabled,c as File,o as WithLabel,l as __namedExportsOrder,i as default};