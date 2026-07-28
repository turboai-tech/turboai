'use client'

import { useEffect, useRef } from 'react'

import { trpc } from '@/utils/trpc-client'

/**
 * 登录后把邮箱匹配的留资并入 profile。
 *
 * 注册路径已由数据库 trigger 覆盖；这个组件补的是另一条路径：用户**先有账号**，
 * 之后（未登录状态下）留了资，再登录 —— trigger 不会再触发，只能应用层来认领。
 *
 * 挂在已登录区域的布局里即可，无渲染输出。服务端函数本身幂等，重复调用只是
 * 认领到 0 条。
 */
export default function ClaimLeads() {
  const claim = trpc.lead.claim.useMutation()
  // 每次挂载只发一次：StrictMode 下 effect 会跑两遍
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true
    claim.mutate()
    // claim 来自 hook，每次渲染都是新引用，放进依赖会变成无限循环
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
