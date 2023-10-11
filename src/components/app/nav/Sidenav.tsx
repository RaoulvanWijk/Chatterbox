import React from "react";
import NavItem from "./NavItem";
import "@resources/styles/components/nav.scss";

export default function Sidenav() {
  return (
    <nav className="app-layout-content sidenav">
      <ul>
        <NavItem href={"/app/channels/@me"} name={"CB"} active={true} />

        <div className="nav-seperator" />
        <NavItem href={"/app/channels/1/1"} name={"SC"} />
        <NavItem href={"/app/channels/1/1"} name={"SC"} />
        <NavItem href={"/app/channels/1/1"} name={"SC"} />
        <NavItem href={"/app/channels/1/1"} name={"SC"} />
        <NavItem href={"/app/channels/1/1"} name={"SC"} />
        <NavItem href={'/app/channels/1/1'} name={'SC'} />
        <NavItem href={'/app/channels/1/1'} name={'SC'} />
        <NavItem href={'/app/channels/1/1'} name={'SC'} />
        <NavItem href={'/app/channels/1/1'} name={'SC'} />
        <NavItem href={'/app/channels/1/1'} name={'SC'} />
        <NavItem href={'/app/channels/1/1'} name={'SC'} />
        <NavItem href={'/app/channels/1/1'} name={'SC'} />
        <NavItem href={'/app/channels/1/1'} name={'SC'} />
        <NavItem href={'/app/channels/1/1'} name={'SC'} />
        <NavItem href={'/app/channels/1/1'} name={'SC'} />
        <NavItem href={'/app/channels/1/1'} name={'SC'} />
        <NavItem href={'/app/channels/1/1'} name={'SC'} />
      </ul>
    </nav>
  );
}
