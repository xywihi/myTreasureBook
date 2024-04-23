// React18新特性介绍&&升级指南
// react历次版本迭代主要想解决的是两类导致网页卡顿的问题，分别是cpu密集型任务和io密集型任务导致的卡顿问题，react18提出的并发特性(Concurrent Rendering)就是为了解决上述问题。

// Concurrent Rendering
// Concurrent Rendering的概念，即没有并发模式，只有并发特性，也就是说并发特性只是个可选项。默认情况下整个应用仍使用同步更新（legacy模式），在使用了并发特性后相关的更新再开启并发更新，不用的话就没有breaking changes。

// concurrent带来的变动可以概括为以下两点：
// 时间分片
// 更新优先级
//  · 同一上下文中的高优先级任务将优先执行
//  · 不同上下文中的高优先级任务将打断正在执行的低优先级任务

//Legacy Mode(传统的react渲染模式，我们使用reactDOM.render创建的react应用都是使用这种模式)
//legacy模式下的所有更新都是同步调度，没有优先级之分。

// Concurrent Rendering
//  · 开启并发特性后更新任务将带有优先级，click事件的更新优先级高于接口请求的更新优先级，因而前者会打断后者的render过程优先执行。
//  · 当更新的render流程过于耗时而超过浏览器一帧的时间时，更新任务将被分割为多个task进行可中断的更新，每个task的执行时间不超过16ms（time slice）。这使得浏览器的每一帧中有空余时间进行绘制，点击事件的更新可以优先呈现到视图中。
//  · 渲染阶段（commit）是不可被打断的。

// 并发模式带来的优势是显然易见的，他使得浏览器在任何情况下都有空余时间绘制，使得在不同性能的设备上紧急任务都能优先render并提交到视图。

// 如何开启Concurrent Rendering
// react18提供了新的根结点创建方式：ReactDOM.createRoot()。使用此API创建的react应用将启用react18全部新特性。

import React from 'react';
// 注意这里ReactDOM是从client引入
import ReactDOM from 'react-dom/client';
import App from './contest';
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// 出于兼容性考虑，传统的ReactDOM.renderAPI也会继续保留，使用ReactDOM.render创建的react18应用的表现与react17完全一致。

// Concurrent Render API

// startTransition
// 它允许我们以一个过渡优先级（ TransitionLane）来调度一次更新。可以称这类更新为过渡任务。过渡任务拥有较低的优先级，它带来的影响可以从以下两方面分析
// 1.过渡任务的执行过程将开启时间分片
// 2.过渡任务的由于优先级较低，因此将让位于其他高优先级任务。

// useTransition
//startTransition可以调度一个过渡任务，过渡任务有一个过渡期，可以认为过渡任务的更新在被提交到视图之前都属于过渡期，而用户无法感知当前是否处于过渡期。为了解决这个问题，React 提供了一个带有 isPending 状态的 hook：useTransition 。useTransition 执行后返回一个数组，数组有两个状态值：
// · 当处于过渡状态的标志—isPending。
// · startTransition，可以把里面的更新任务变成过渡任务，等同于与上述的startTransitionAPI。

import { useTransition } from 'react' 
const  [ isPending , startTransition ] = useTransition ()
// 那么当任务处于过渡状态的时，isPending 为 true，可以作为用户等待的 UI 呈现。比如：
{ isPending && <Spinner/> }

// useDefferedValue
// useDeferredValue 的实现效果也类似于startTransition。

const [a, setA] = useState(0);
const deferredA = useDeferredValue(a);

// useDeferredValue实质上是基于原始state生产一个新的state（DeferredValue），当对原始state进行setState时，DeferredValue的值会通过过渡任务得到，因此视图中使用DeferredValue就会得到和startTransitionAPI一样的效果，事实上这两个API相当于从两个角度实现过渡任务，本质上是一样的。


// 饥饿问题
// 低优先级任务的render过程多次被高优先级任务打断而得不到执行的现象称为饥饿问题。react通过过期时间来解决饥饿问题，不同优先级对应不同的过期时间。当低优先级任务一直未执行而超过时期时间时该任务会被视为过期任务，其优先级会被提升为同步优先级，会立即执行。

//升级指南
// 官方升级指南
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html