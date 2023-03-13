import { Menu, Button, Text } from '@mantine/core';
import React from 'react'
interface IProps {
    title:string
}

export const DateSelect: React.FC<IProps> = (Props) => {
  return (
    <Menu shadow="md" width={200}>
    <Menu.Target>
      <Button>Toggle menu</Button>
    </Menu.Target>

    <Menu.Dropdown>
      <Menu.Label>Application</Menu.Label>
      <Menu.Item >Settings</Menu.Item>
      <Menu.Item >Messages</Menu.Item>
      <Menu.Item >Gallery</Menu.Item>

    </Menu.Dropdown>
  </Menu>
  )
}

