# Graph

### Represent Graph

1. Adjacency List(Directed Graph)

```
{
  a: [b, c],
  b: [d]
}

a -> b -> d
  \
    -> c
```

2. Edges List

```
[
  [i, j],
  [k, i],
  [m, k]
]

i - j
  \
    k - m
```

You can convert `Edges list` to `Adjacency List` by loop the item inside edges.

```
{
  i: [j, k],
  j: [i]
  k: [i],
  m: [k]
}

```
