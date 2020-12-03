# Grammar

    <Expression> ::= <ExpressionGroup> | <BinaryExpression> | <UnaryExpression> | <IntegerLiteral>
    <ExpressionGroup> ::= '(' <Expression> ')'
    <BinaryExpression> ::= <Expression> <BinaryOperator> <Expression>
    <UnaryExpression> ::= <UnaryOperator> <Expression>
    <BinaryOperator> ::= '+' | '-' | '/' | '*'
    <UnaryOperator> ::= '+' | '-'
    <IntegerLiteral> ::= <Digit> <IntegerLiteral> | <Digit>
    <Digit> ::= '0' | '1' |'2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'


# Kolja

  Arrow Functions sind in JS nicht nur eine andere Schreibweise von Funktionen, sondern haben auch eine leicht andere Funktionalität
  Sie haben keinen Kontext (this) außer den aktuellen Scope
  Was man bei Angular noch bedenken muss: Immer wenn Du Funktionen im html-Template aufrufst, werden die bei jedem Cycle, also praktisch im millisekunden-Takt aufgerufen
  Weil Angular ja nicht weiss, ob sie ggf. einen neuen Wert liefern
  Das kommt bei Dir häufiger vor und macht Dein Spiel ggf. langsam
  Bsp. grid.component.html

  Da zieht sozusagen die schlaue Change Detection von Angular gar nicht
  Die wirkt nur auf Properties
  Also besser Variablen haben, die man bei Bedarf abändert
